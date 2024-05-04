import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';

export const register = async (req, res) => {
  const isFirstAccount = (await UserList.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const newUser = await UserList.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'User successfully created', newUser });
};
export const login = async (req, res) => {
  res.send('Login');
};
