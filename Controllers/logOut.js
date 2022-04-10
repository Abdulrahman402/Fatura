module.exports = async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    maxAge: 0,
  });

  return res.status(200).json();
};
