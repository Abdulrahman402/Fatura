const User = require("../Models/User");

const ACCESSTOKEN = require("../Services/JWT/generateAccess");

const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const decoded = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFRESH_SECRET
  );

  if (decoded._id != req.user._id)
    return res.status(401).json({ Message: "Authentication failed" });

  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).json({ Message: "User not found" });

  const accessToken = await ACCESSTOKEN(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 300000,
  });

  res.status(200).json({ User: user, "Access Token": accessToken });
};
