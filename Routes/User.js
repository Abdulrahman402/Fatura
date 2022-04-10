const express = require("express");

const router = express.Router();

const verifyRefresh = require("../Middlewares/verifyRefresh");
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

const addEmployee = require("../Controllers/addEmployee");
const login = require("../Controllers/login");
const generateAccessToken = require("../Controllers/generateAccessToken");
const logOut = require("../Controllers/logOut");
const assignRole = require("../Controllers/assignRole");

router.post("/addEmployee", auth, isAdmin, addEmployee);
router.post("/login", login);
router.post("/generateAccessToken", verifyRefresh, generateAccessToken);
router.get("/logOut", auth, logOut);
router.put("/assignRole/:userId", auth, isAdmin, assignRole);

module.exports = router;
