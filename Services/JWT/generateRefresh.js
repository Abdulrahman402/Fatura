const jwt = require("jsonwebtoken");

module.exports = async (user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.REFRESH_SECRET,
    { expiresIn: "1y" }
  );

  return token;
};
