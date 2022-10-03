import express from "express";
import { User } from "../model/userModel";

// @desc create new users
// @route POST /createAdmin
export const createAdmin = async (req: express.Request, res: express.Response) => {
  const { name, age, email, password } = req.body;

  const emptyFields = []

  if (!name) {
    emptyFields.push('name');
  }
  if (!age) {
    emptyFields.push('age');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    password.push('password');
  }

  try {
    if (emptyFields.length > 0) {
      throw new Error(`Please fill following fields: ${emptyFields.join(', ')}`);
    }

    const adminAlreadyExist = await User.findOne({ isAdmin: true });

    if (adminAlreadyExist) {
      throw new Error('Admin already exists');
    }

    const exist = await User.findOne({ email });

    if (exist) {
      throw new Error('User with such email exists');
    }

    const admin = await User.create({ name, age, email, password, isAdmin: true });

    res.status(200).json(admin);

  } catch (error) {
    res.status(400).json({error: error.message });
  }
};
