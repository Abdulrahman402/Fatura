const express = require("express");
require("express-async-errors");
require("dotenv").config({ path: `${process.env.NODE_ENV}.env` });

const app = express();

require("./Startup/DB")();
require("./Startup/Routes")(app);

module.exports = app;
