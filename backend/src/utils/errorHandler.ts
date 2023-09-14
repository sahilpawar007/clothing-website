class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    // super is the contructor of class Error
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
