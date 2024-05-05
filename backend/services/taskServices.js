import 'express-async-errors';
import TaskList from '../daos/models/TaskModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllTasks = async (req, res) => {
  console.log(req.user);
  const allTasks = await TaskList.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ allTasks });
};

export const getSingleTask = async (req, res) => {
  const { id } = req.params;
  const task = await TaskList.findById(id);
  res.status(StatusCodes.OK).json({ task });
};

export const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const newTask = await TaskList.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'task added', newTask });
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await TaskList.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'task successfully updated', updatedTask: updatedTask });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const removedTask = await TaskList.findByIdAndDelete(id);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'task successfully removed', removedTask: removedTask });
};
