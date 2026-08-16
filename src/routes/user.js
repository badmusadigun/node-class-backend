const express = require("express");
const { register, login, verifyOtp } = require("../controllers/user");
const { registerValidator, loginValidator } = require("../validator/user");
const authCheck = require("../middleware/authCheck");
const { authMe } = require("../controllers/user");


const route = express.Router();

route.post("/register", registerValidator, register);
route.post("/login", loginValidator, login);
route.get("/me", authCheck, authMe);
route.post("/verify-otp", verifyOtp);



module.exports = route;