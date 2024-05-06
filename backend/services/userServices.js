import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';
import TaskList from '../daos/models/TaskModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await UserList.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get Application stats' });
};
export const editUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Edit user' });
};
