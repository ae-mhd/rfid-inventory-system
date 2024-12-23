import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import AppError from "../utils/AppError";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors: { [key: string]: string[] } = {};
    errors.array().forEach((error: ValidationError) => {
      if (error.type === "field") {
        if (!formattedErrors[error.path]) {
          formattedErrors[error.path] = [];
        }
        formattedErrors[error.path].push(error.msg);
      }
    });
    return next(new AppError("Validation failed", 400, formattedErrors));
  }
  next();
};
