// utils/ErrorHandler.js
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  handleError(res) {
    res.status(this.statusCode).json({
      success: false,
      message: this.message,
    });
  }
}

export default ErrorHandler;
