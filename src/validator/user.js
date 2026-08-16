const { body } = require("express-validator");

const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("FirstName is Required")
    .isString()
    .withMessage("FirstName must be a string")
    .isLength({ min: 2, max: 25 })
    .withMessage(
      "firstName must not be lesser than 2 and greater than 25 characters",
    ),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("latName is Required")
    .isString()
    .withMessage("latName must be a string")
    .isLength({ min: 2, max: 25 })
    .withMessage(
      "latName must not be lesser than 2 and greater than 25 characters",
    ),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email Address"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Invalid phone number format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 0, // Set to 0 if numbers are not strictly required
    })
    .withMessage(
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character",
    ),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email Address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 0, // Set to 0 if numbers are not strictly required
    })
    .withMessage(
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character",
    ),
];

module.exports = { registerValidator, loginValidator };