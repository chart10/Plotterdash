import 'express-async-errors';
import TaskList from '../daos/models/taskModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/CustomError.js';

export const getAllTasks = async (req, res) => {
  const allTasks = await TaskList.find({});
  res.status(StatusCodes.OK).json({ allTasks });
};

export const getSingleTask = async (req, res) => {
  const { id } = req.params;
  const task = await TaskList.findById(id);
  if (!task) throw new NotFoundError(`no task with id ${id} found`);
  res.status(StatusCodes.OK).json({ task });
};

export const createTask = async (req, res) => {
  const newTask = await TaskList.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'task added', newTask });
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await TaskList.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedTask) {
    return res.status(404).json({ msg: `no task with id ${id} found` });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'task successfully updated', updatedTask: updatedTask });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const removedTask = await TaskList.findByIdAndDelete(id);
  if (!removedTask) {
    return res.status(404).json({ msg: `no task with id ${id} found` });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'task successfully removed', removedTask: removedTask });
};
