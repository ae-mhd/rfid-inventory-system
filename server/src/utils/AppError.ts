class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errors?: { [key: string]: string[] };

  constructor(
    message: string,
    statusCode: number,
    errors?: { [key: string]: string[] }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
