module.exports = async (req, res, next) => {
  if (req.user.role != "Admin")
    return res.status(403).json({ Message: "Unauthorized access" });
  next();
};
