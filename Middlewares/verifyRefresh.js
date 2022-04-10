const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).send("Access denied");

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
  next();
};
