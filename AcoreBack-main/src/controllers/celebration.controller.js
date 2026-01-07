import Employee from "../models/user.model.js";


export const getUpcomingCelebrations = async (req, res) => {
  try {
    const { days } = req.query; 
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingDateLimit = days
      ? new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
      : new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); 

 
    const employees = await Employee.find();

    const upcomingEvents = [];

    employees.forEach((emp) => {
 
      if (emp.birthday) {
        let dobThisYear = new Date(
          today.getFullYear(),
          emp.birthday.getMonth(),
          emp.birthday.getDate()
        );
        dobThisYear.setHours(0, 0, 0, 0);

        // If birthday already passed this year, move to next year
        if (dobThisYear < today) {
          dobThisYear = new Date(
            today.getFullYear() + 1,
            emp.birthday.getMonth(),
            emp.birthday.getDate()
          );
        }

        if (dobThisYear <= upcomingDateLimit) {
          upcomingEvents.push({
            employeeId: emp.employeeId,
            employeeName: emp.name || emp.firstName + " " + emp.lastName,
            type: "birthday",
            date: dobThisYear,
          });
        }
      }

      // Handle Anniversary
      if (emp.anniversaryDate) {
        let annThisYear = new Date(
          today.getFullYear(),
          emp.anniversaryDate.getMonth(),
          emp.anniversaryDate.getDate()
        );
        annThisYear.setHours(0, 0, 0, 0);

        // If anniversary already passed this year, move to next year
        if (annThisYear < today) {
          annThisYear = new Date(
            today.getFullYear() + 1,
            emp.anniversaryDate.getMonth(),
            emp.anniversaryDate.getDate()
          );
        }

        if (annThisYear <= upcomingDateLimit) {
          upcomingEvents.push({
            employeeId: emp.employeeId,
            employeeName: emp.name || emp.firstName + " " + emp.lastName,
            type: "anniversary",
            date: annThisYear,
          });
        }
      }
    });

    // Sort events by date
    upcomingEvents.sort((a, b) => a.date - b.date);

    res.status(200).json({
      status: true,
      count: upcomingEvents.length,
      data: upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
