import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID");

  next();
};
