// Middleware function to remove all try catch blocks in the application || alternative: import express-async-errors library
import { Request, Response, NextFunction } from 'express';

export const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

