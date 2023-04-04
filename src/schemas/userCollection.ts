import Joi from "joi";
import mongoose from "mongoose";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema<UserModel>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },

  isAdmin: {
    type: Boolean,
  },
  // roles:[], roles assigned to users
  // operations: []set of user operations
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    `${process.env.JWT_SECRET}`
  );
  return token;
};

export const User = mongoose.model<UserModel>("User", userSchema);

export const validateUser = (user: UserModel) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().required().email(),
    // joi-password complexity for complex passwords
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
};
