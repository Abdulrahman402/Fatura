const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const errors = require("../Middlewares/errors");

const user = require("../Routes/User");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(compression());

  app.use("/user", user);

  app.use(errors);
};
