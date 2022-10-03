import express from "express";
import { User } from "../model/userModel";

// @desc get all users
// @route POST /users
export const getUsers = async (req: express.Request, res: express.Response) => {

  const { _id: userID, email, password, isAdmin } = req.body;

  try {
    if ( !userID || !email || !password || !isAdmin ) {
      throw new Error(`user undefined`)
    }

    if ( isAdmin ) {
      const allUsers = await User.find({}).sort({createdAt: -1});
      res.status(200).json(allUsers);
    } else {
      const user = await User.findOne({userID})

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({error: error.message });
  }
};
