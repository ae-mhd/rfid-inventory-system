import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }
  // if (err.name === "ValidationError") {
  //   console.log("ValidationError",err);
  //   return res.status(400).json({
  //     status: "error",
  //     message: "Validation error",
  //     details: err.message,
  //   });
  // }
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
