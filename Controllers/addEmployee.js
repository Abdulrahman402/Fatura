const User = require("../Models/User");

const joi = require("joi");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).json({ Message: error.details[0].message });

  const email = req.body.email.toLowerCase();

  let employee = await User.findOne({ email: email });
  if (employee)
    return res.status(400).json({ Message: "Email already registered" });

  employee = new User({
    name: req.body.name,
    email: email,
    password: req.body.password,
    role: req.body.role,
  });

  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(req.body.password, salt);
  await employee.save();

  res.status(201).json({ Employee: employee });
};

function validateEmployee(employee) {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().min(8).max(12).required(),
    email: joi
      .string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    role: joi.string(),
  });
  return schema.validate(employee);
}
