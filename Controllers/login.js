const User = require("../Models/User");

const bcrypt = require("bcryptjs");
const joi = require("joi");

const ACCESSTOKEN = require("../Services/JWT/generateAccess");
const REFRESHTOKEN = require("../Services/JWT/generateRefresh");

module.exports = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ Message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPW = await bcrypt.compare(req.body.password, user.password);
  if (!validPW) return res.status(400).send("Invalid email or password");

  const accessToken = await ACCESSTOKEN(user);
  const refreshToken = await REFRESHTOKEN(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 300000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 6.048e8,
  });

  res.status(200).json({
    User: user,
    "Access Token": accessToken,
    "Refresh Token": refreshToken,
  });
};

function validate(req) {
  const schema = joi.object({
    email: joi
      .string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: joi.string().required(),
  });
  return schema.validate(req);
}
