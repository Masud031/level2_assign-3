/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

// Generic error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: err, 
  });
};

export default errorHandler;
