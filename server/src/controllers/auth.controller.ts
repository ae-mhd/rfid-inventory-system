import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../models/user.model";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { sendTokenResponse, sendVerificationOTP } from "../utils/authHelpers";
import { asyncHandler, generateToken, sendEmail } from "../utils/helpers";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new AppError("User already exists", 400));
    }

    user = new User(req.body);
    await user.save();
    await sendVerificationOTP(
      req,
      res,
      next,
      "User created successfully, Please verify your email to activate your account",
      200
    );
  }
);

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return next(new AppError("Invalid Credentials", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid Credentials", 401));
    }
    if (!user.isVerified) {
      return await sendVerificationOTP(
        req,
        res,
        next,
        "User is not verified, OTP sent to email",
        401
      );
    }
    const token = generateToken(user._id as string);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true for https
      maxAge: 24 * 60 * 60 * 1000, // 1D
    });
    const customResponse = {
      status: "success",
      message: "User signed in successfully",
      user: {
        id: user._id,
        name: user.firstName,
        email: user.email,
        // role: user.role,
      },
    };
    return sendTokenResponse(user, res, 200, customResponse);
  }
);

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if (!token) {
      return next(new AppError("Unauthorized", 401));
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    if (!decoded) {
      return next(new AppError("Unauthorized", 401));
    }
    const user_id = (decoded as jwt.JwtPayload).user_id;
    const user = await User.findById(user_id).select("-password");
    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
    res.status(200).json({ user: user });
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const resetToken = generateToken(user._id as string, "10m");
    user.resetPasswordToken = resetToken;

    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      html: `Reset your password at: <a  href="${resetURL}" style="background-color: #0cbb10; color: white; font-weight: bold; font-size: 16px; padding: 10px ; text-decoration: none;  border-radius: 5px; display: inline-block; margin-top: 10px;">إعادة تعيين كلمة المرور</a>`,
    });

    res.status(200).json({ status: "success", message: "Token sent to email" });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as {
        user_id: string;
      };
      const user = await User.findOne({
        _id: decoded.user_id,
        resetPasswordToken: token,
      });

      if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      await user.save();

      const customResponse = {
        status: "success",
        message: "Password reset successfully",
        user: {
          id: user._id,
          name: user.firstName,
          email: user.email,
          // role: user.role,
        },
      };
      sendTokenResponse(user, res, 200, customResponse);
    } catch (error) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
  }
);

export const sendOtp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await sendVerificationOTP(req, res, next, "OTP sent to email", 200);
  }
);

export const verifyOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Email not found", 401));
    }
    if (user.otp !== otp) {
      return next(new AppError("OTP is incorrect", 400));
    }
    if (user.otpExpiration && user.otpExpiration < new Date()) {
      return next(new AppError("OTP has expired", 400));
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "User verified successfully" });
  }
);

export const signOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("auth_token", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "User signed out successfully",
    });
  }
);
