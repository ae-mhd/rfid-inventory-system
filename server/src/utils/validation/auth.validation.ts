import { check } from "express-validator";
import { validator } from "../../middleware/validator";

export const registerValidation = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validator,
];
export const signInValidation = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validator,
];
export const forgotPasswordValidation = [
  check("email").isEmail().withMessage("Email is required"),
  validator,
];
export const resetPasswordValidation = [
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validator,
];
export const sendOtpValidation = [
  check("email").isEmail().withMessage("Email is required"),
];
export const verifyOTPValidation = [
  check("email").isEmail().withMessage("Email is required"),
  check("otp")
    .isNumeric()
    .withMessage("OTP must be exactly 6 numbers ")
    .isLength({ min: 6, max: 6 })
    .withMessage("Otp must be at 6 characters"),
  validator,
];
