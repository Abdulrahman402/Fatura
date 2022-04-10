const User = require("../Models/User");

const joi = require("joi");

module.exports = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ Message: error.details[0].message });

  let user = await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: { role: req.body.role } }
  );
  if (!user) return res.status(404).json({ Message: "User not found" });

  res.status(200).json({ Message: "User updated" });
};

function validate(req) {
  const schema = joi.object({
    role: joi.string().valid("Employee", "Admin").required(),
  });
  return schema.validate(req);
}
