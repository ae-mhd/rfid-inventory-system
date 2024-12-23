import { NextFunction, Request, Response } from "express";
import { sendEmail } from "./helpers";
import AppError from "./AppError";
import User, { UserType } from "../models/user.model";
import crypto from "crypto";
import { generateToken } from "./helpers";
export type sendTokenResponseType<T = any> = {
  user: UserType;
  res: Response;
  statusCode: number;
  customResponse?: T;
};
export const updateUserWithOTP = async (
  user: any,
  otp: number,
  expiration: Date
) => {
  user.otp = otp;
  user.otpExpiration = expiration;
  await user.save();
};

export const handleResponse = (
  res: Response,
  status: 200 | 401,
  message: string
) => {
  if (status === 401) {
    throw new AppError(message, 401);
  }
  res.status(status).json({ status: "success", message });
};

export const sendTokenResponse = <T = any>(
  user: UserType,
  res: Response,
  statusCode: number = 200,
  customResponse?: T
): void => {
  const token = generateToken(user._id as string);

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(statusCode).json(customResponse);
};
export const generateOTP = (): { otp: number; expiration: Date } => {
  const otp = crypto.randomInt(100000, 999999);
  const expiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return { otp, expiration };
};
export const sendVerificationOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
  customMessage?: string,
  customStatus?: 401 | 200
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (user.isVerified) {
      return next(new AppError("User alrady verified", 400));
    }

    const { otp, expiration } = generateOTP();
    await updateUserWithOTP(user, otp, expiration);
    await sendEmail({
      email,
      subject: "OTP for verification of your account",
      html: `Your OTP for verification is: ${otp}`,
    });

    const message = customMessage || "OTP sent to email";
    const status = customStatus || 200;
    handleResponse(res, status, message);
  } catch (error) {
    next(error);
  }
};
