import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';
import { hashPassword, comparePassword } from '../../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/CustomError.js';
import { createJWT } from '../../utils/tokenUtils.js';

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

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'Successfully logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout'),
    {
      httpOnly: true,
      expires: new Date(Date.now()),
    };
  res.status(StatusCodes.OK).json({ msg: 'Logged out successfully' });
};
