import express from "express";
import { User } from "../model/userModel";

// @desc find specific users
// @route POST /signin
export const signInUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const emptyFields = [];

    if (!email) {
      emptyFields.push('email');
    }
    if (!password) {
      password.push('password');
    }

    if (emptyFields.length > 0) {
      res.status(400).json(`Please fill following fields: ${emptyFields.join(', ')}`);
      return;
    }

    const existEmail = await User.findOne({email})

    if (!existEmail) {
      throw new Error('no user with such email exist')
    }

    const existingUser = await User.findOne({ email, password });

    if (!existingUser) {
      throw new Error('wrong password')
    }

    res.status(200).json(existingUser);

  } catch (error) {
    res.status(400).json({error: error.message });
  }
}
