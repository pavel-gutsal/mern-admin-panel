import express from "express";
import { Edits } from "../types/Edites";
import { User } from "../model/userModel";

// @desc update/edit
// recieves {user: user object, id: id of obj to be patched, updates}
// @route PATCH /
export const patchUser = async (req: express.Request, res: express.Response) => {
  const { id: userID, user, update} = req.body;

  console.log(req.body);

  if (userID !== user._id && !user.isAdmin) {
    res.status(400).json(`unauthorized`);
    return;
  };
  
  const updatedObject: Edits = {};

  if (update?.name) {
    updatedObject.name = update.name;
  }

  if (update?.email) {
    updatedObject.email = update.email;
  }

  if (update?.password) {
    updatedObject.password = update.password;
  }

  if (update?.age) {
    updatedObject.age = update.age;
  }

  const editedUser = await User.findOne({_id: userID});

  if (!editedUser) {
    res.status(400).json(`no such user`);
    return;
  }

  const { name, age, email, password } = update;

  console.log(name, age, email, password)

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

    if (password.length < 6 ) {
      throw new Error('password is too short');
    }

    if (password.length > 45 ) {
      throw new Error('password is too long');
    }

    const userById = await User.findOne({ _id: userID });

    if (userById && userById.email !== email) {
      if (/\ /.test(email)) {
        throw new Error('blank spaces inside email');
      }

      if (email.length > 30) {
        throw new Error('email is unrealisticly long')
      }

      const exists = await User.findOne({ email })

      if (exists) {
        throw new Error('user with such email already exists')
      }
    }
  
    const updatedUser = await User.findOneAndUpdate({_id: userID}, { ...updatedObject }, { new: true });

    console.log(updatedUser)

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(400).json({error: error.message });
  }
};
