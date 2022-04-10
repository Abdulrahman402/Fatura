const jwt = require("jsonwebtoken");

module.exports = async (user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: "5m" }
  );

  return token;
};
