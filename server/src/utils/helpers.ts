import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NextFunction, Request, Response } from "express";

interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Dex App <amirabdelkadr144@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
export const requestsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many  requests, please try again later.",
});
export const generateToken = (user_id: string, expiresIn: string = "1d") => {
  return jwt.sign({ user_id }, process.env.TOKEN_KEY as string, {
    expiresIn,
  });
};
