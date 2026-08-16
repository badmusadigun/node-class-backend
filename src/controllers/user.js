const { validationResult } = require("express-validator");
const User = require("../models/user");
const userResponse = require("../DTO/userResponse.dto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const envobj = require("../config/env");
const { sendMail } = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const saltRound = Number(envobj.saltRound);

    const hashPassword = await bcrypt.hash(password, saltRound);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const userObj = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      emailOtp: otp,
      emailOtpExpires: otpExpires,
      isVerified: false,
    };

    await User.create(userObj);
    sendMail(
     email,
  "Verify Your Email",
  `
    <h2>Welcome ${firstName}!</h2>
    <p>Thank you for creating an account.</p>
    <p>Your verification code is:</p>
    <h1>${otp}</h1>
    <p>This code will expire in 10 minutes.</p>
  `
    );
    return res.status(201).json({
      status: "true",
      message: "Account Created Successfully",
      user: userResponse(userObj),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // console.log(userResponse(user));

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.firstName },
      envobj.jwtSecret,
      { expiresIn: envobj.expireIn },
    );

    return res.status(200).json({
      status: true,
      message: "login successfully",
      user: userResponse(user),
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const authMe = async (req, res) => {
  try {
    const userDecode = req.user;
    console.log(userDecode);

    const user = await User.findById(userDecode.id);
    console.log(user);

    return res.status(200).json({
      status: true,
      message: "login successfully",
      user: userResponse(user),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        status: false,
        message: "Email is already verified",
      });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (user.emailOtpExpires < new Date()) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.emailOtp = undefined;
    user.emailOtpExpires = undefined;

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


module.exports = { register, login, authMe, verifyOtp };