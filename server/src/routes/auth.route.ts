import express, { NextFunction, Request, Response } from "express";
import {
  forgotPassword,
  register,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  verifyOTP,
  verifyToken,
} from "../controllers/auth.controller";
import { verificationCheck } from "../middleware/auth.middleare";
import { requestsLimiter } from "../utils/helpers";
import {
  forgotPasswordValidation,
  registerValidation,
  resetPasswordValidation,
  sendOtpValidation,
  signInValidation,
  verifyOTPValidation,
} from "../utils/validation/auth.validation";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/signin", verificationCheck, signIn);
router.get("/signout", signOut);

router.get("/verifyToken", verifyToken);
router.post(
  "/forgotPassword",
  requestsLimiter,
  forgotPasswordValidation,
  forgotPassword
);
router.patch("/resetPassword/:token", resetPasswordValidation, resetPassword);

router.post("/send-otp", requestsLimiter, sendOtpValidation, sendOtp);
router.post("/verify-otp", verifyOTPValidation, verifyOTP);

export default router;
