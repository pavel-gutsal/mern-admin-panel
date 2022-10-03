import express from "express";
const { getUsers, createUser, signInUser, deleteUser, patchUser, createAdmin } = require('../controller/controller');
export const router = express.Router();

router.post('/users', getUsers);

router.post('/newUser', createUser);

router.post('/createAdmin', createAdmin);

router.post('/signin', signInUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);
