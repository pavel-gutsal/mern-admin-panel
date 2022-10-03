import express from "express";
import { User } from "../model/userModel";

// @desc delete specific users
// recieves {user: user object, id: id of obj to be deleted}
// @route DELETE /
export const deleteUser = async (req: express.Request, res: express.Response) => {
  const userID = req.body.id;
  const user = req.body.user;

  try {
    if (!userID || !user) {
      throw new Error('wrong credentials')
    };

    if ( user._id === userID || user.isAdmin ) {

      const user = await User.findOneAndDelete({ userID });

      res.status(200).json('user was deleted');
    }
  } catch ( error ) {
    res.status(200).json({error: error.message });
  }
};
