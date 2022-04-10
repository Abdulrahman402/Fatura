const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => winston.info("connected to Fatura database!"))
    .catch((err) => winston.error("Database connection error"));
};
