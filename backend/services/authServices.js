import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';
import { hashPassword, comparePassword } from '../../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/CustomError.js';

export const register = async (req, res) => {
  const isFirstAccount = (await UserList.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const newUser = await UserList.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'User successfully created' });
};
export const login = async (req, res) => {
  let user = await UserList.findOne({ username: req.body.email_username });
  if (!user) {
    user = await UserList.findOne({ email: req.body.email_username });
  }
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  res.status(StatusCodes.OK).json({ msg: 'user found', user });
};
