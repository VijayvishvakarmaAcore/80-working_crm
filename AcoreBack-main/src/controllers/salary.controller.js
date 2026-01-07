import Salary from "../models/salary.model.js";
import Attendance from "../models/attendance.model.js";
import Leave from "../models/leave.model.js";
import PDFDocument from "pdfkit";

export const getSalaryByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const salary = await Salary.find({ employeeId });
    if (!salary) {
      return res
        .status(404)
        .json({ status: false, message: "Salary not found." });
    }

    res.status(200).json({ status: true, data: salary });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getSalaryByMonth = async (req, res) => {
  try {
    let { employeeId, month, year } = req.params;

    if (!employeeId || isNaN(month) || isNaN(year)) {
      return res.status(400).json({
        status: false,
        message: "employeeId, month and year are required and must be valid",
      });
    }

    const salary = await Salary.findOne({
      employeeId,
      month: Number(month),
      year: Number(year),
    });

    if (!salary) {
      return res.status(404).json({
        status: false,
        message: "Salary not found for this month and year.",
      });
    }

    res.status(200).json({ status: true, data: salary });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const markSalaryPaid = async (req, res) => {
  try {
    const { salaryId } = req.params;

    const salary = await Salary.findByIdAndUpdate(
      salaryId,
      { status: "paid" },
      { new: true }
    );
    res.status(201).json({ status: true, data: salary });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const generateSalary = async (req, res) => {
  try {
    const { employeeId, employeeName, month, year, baseSalary } = req.body;

    const totalWorkingDays = new Date(year, month, 0).getDate();

    // get attendance
    const attendance = await Attendance.find({
      employeeId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month - 1, totalWorkingDays),
      },
    });

    const presentDays = attendance.length;

    // get leaves
    const leaves = await Leave.find({
      employeeId,
      status: "approved",
      fromDate: { $gte: new Date(year, month - 1, 1) },
      toDate: { $lte: new Date(year, month - 1, totalWorkingDays) },
    });

    let leaveDays = 0;
    leaves.forEach((l) => {
      const diff =
        (new Date(l.toDate) - new Date(l.fromDate)) / (1000 * 60 * 60 * 24) + 1;
      leaveDays += diff;
    });

    const absentDays = totalWorkingDays - presentDays - leaveDays;

    const perDaySalary = baseSalary / totalWorkingDays;
    const salaryDeduction = absentDays * perDaySalary;

    const finalSalary = baseSalary - salaryDeduction;

    const salary = await Salary.create({
      employeeId,
      employeeName,
      month,
      year,
      baseSalary,
      totalWorkingDays,
      presentDays,
      leaveDays,
      absentDays,
      salaryDeduction,
      finalSalary,
      status: "generated",
    });

    res.json({ status: true, data: salary });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const createManualSalary = async (req, res) => {
  try {
    const {
      employeeId,
      employeeName,
      month,
      year,
      baseSalary,
      presentDays,
      leaveDays,
      absentDays,
      salaryDeduction,
      finalSalary,
    } = req.body;

    if (!employeeId || !month || !year) {
      return res
        .status(400)
        .json({ status: false, message: "Required fields missing" });
    }

    const salary = await Salary.create({
      employeeId,
      employeeName,
      month,
      year,
      baseSalary,
      totalWorkingDays: new Date(year, month, 0).getDate(),
      presentDays,
      leaveDays,
      absentDays,
      salaryDeduction,
      finalSalary,
      status: "generated",
    });

    res.status(201).json({ status: true, data: salary });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const generateSalarySlip = async (req, res) => {
  try {
    const { salaryId } = req.params;

    const salary = await Salary.findById(salaryId);

    if (!salary) {
      return res.status(404).json({
        status: false,
        message: "Salary record not found",
      });
    }

    const doc = new PDFDocument();

    const filename = `SalarySlip_${salary.employeeId}_${salary.month}-${salary.year}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("Acore IT Hub Pvt Ltd", { align: "center" })
      .moveDown();

    doc.fontSize(14).text("Salary Slip", { align: "center" }).moveDown(2);


    doc.fontSize(12).text(`Employee ID: ${salary.employeeId}`);
    doc.text(`Employee Name: ${salary.employeeName}`);
    doc.text(`Month: ${salary.month}`);
    doc.text(`Year: ${salary.year}`);
    doc.moveDown();

    // ----- SALARY DETAILS -----
    doc.text(`Base Salary: ₹${salary.baseSalary}`);
    doc.text(`Working Days: ${salary.totalWorkingDays}`);
    doc.text(`Present Days: ${salary.presentDays}`);
    doc.text(`Leave Days: ${salary.leaveDays}`);
    doc.text(`Absent Days: ${salary.absentDays}`);
    doc.text(`Salary Deduction: ₹ ${salary.salaryDeduction}`);
    doc.text(`Final Salary: ₹ ${salary.finalSalary}`);
    doc.moveDown();



    doc.end();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
