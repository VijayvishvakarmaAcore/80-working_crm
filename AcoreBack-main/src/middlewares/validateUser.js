export const validateUser = (req, res, next) => {
  const {
    name,
    email,
    password,
    designation,
    mobile,
    birthday,
    department,
    dateOfJoining,
    employeeType,
  } = req.body;

  if (!name || !email || !mobile || !password || !designation || !department) {
    return res.status(400).json({
      status: false,
      message: "All required field must be filled",
    });
  }

  if (!birthday || !dateOfJoining) {
    return res.status(400).json({
      status: false,
      message: "Invalid employee type: coes full-time or intern ",
    });
  }
  next();
};
