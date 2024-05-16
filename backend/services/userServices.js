import { StatusCodes } from 'http-status-codes';
import UserList from '../daos/models/UserModel.js';
import TaskList from '../daos/models/TaskModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await UserList.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const users = await UserList.countDocuments();
  const tasks = await TaskList.countDocuments();
  res.status(StatusCodes.OK).json({ users, tasks });
};
export const editUser = async (req, res) => {
  const newUserData = { ...req.body };
  delete newUserData.password;
  console.log(req.file);

  if (req.file) {
    console.log(req.file.path);
    const response = await cloudinary.uploader.upload(req.file.path);
    console.log(response);
    await fs.unlink(req.file.path);
    newUserData.avatar = response.secure_url;
    newUserData.avatarPublicId = response.public_id;
  }
  const editedUser = await UserList.findByIdAndUpdate(
    req.user.userId,
    newUserData,
    {
      new: true,
    }
  );
  if (req.file && editedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(editedUser.avatarPublicId);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'User successfully updated', user: editedUser });
};
