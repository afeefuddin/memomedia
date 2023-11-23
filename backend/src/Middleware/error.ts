import { Request, Response, NextFunction } from 'express';

// Global error handler middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Send a response to the client
  res.status(500).json({ error: 'Something went wrong' });
};

export {errorHandler};