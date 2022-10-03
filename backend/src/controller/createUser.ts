import express from "express";
import { User } from "../model/userModel";

// @desc create new users
// @route POST /newUser
export const createUser = async (req: express.Request, res: express.Response) => {
  const { name, age, email, password } = req.body;

  const emptyFields = [];

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
  
  if (emptyFields.length > 0) {
    res.status(400).json(`Please fill following fields: ${emptyFields.join(', ')}`);
    return;
  }

  try {
    if (!/^[a-zA-Z]+$/.test(name)) {
      throw new Error('name should contain only Latin characters');
    }

    if (name.length > 25) {
      throw new Error('name should contain 25 charactars top');
    }

    if (name.length < 3) {
      throw new Error('name is too short');
    }

    if (age < 0 || age > 120) {
      throw new Error('incorrect age');
    }

    if (/\ /.test(email)) {
      throw new Error('blank spaces inside email');
    }

    if (email.length > 45) {
      throw new Error('email is unrealisticly long')
    }

    const exists = await User.findOne({ email })

    if (exists) {
      throw new Error('user with such email already exists')
    }

    const newUser = await User.create({ name, age, email, password, isAdmin: false});

    res.status(200).json(newUser);

  } catch (error) {
    res.status(400).json({error: error.message });
  }
};
