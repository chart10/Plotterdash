import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';
import { hashPassword } from '../../utils/passwordUtils.js';

export const register = async (req, res) => {
  const isFirstAccount = (await UserList.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const newUser = await UserList.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'User successfully created' });
};
export const login = async (req, res) => {
  res.send('Login');
};
