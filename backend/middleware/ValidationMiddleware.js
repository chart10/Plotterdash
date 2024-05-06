import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/CustomError.js';
import { TASK_STATUS } from '../../utils/constants.js';
import mongoose from 'mongoose';
import TaskList from '../daos/models/TaskModel.js';
import UserList from '../daos/models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        if (errorMessages[0].startsWith('No task')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError('Not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('A name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 character long')
    .trim(),
]);

export const validateTaskInput = withValidationErrors([
  body('title').notEmpty().withMessage('A title for a task is required'),
  body('category')
    .isIn(Object.values(TASK_STATUS))
    .withMessage('Invalid category'),
]);

export const validateMongoId = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid Mongo ID format');
    const task = await TaskList.findById(value);
    if (!task) throw new NotFoundError(`No task with id ${value} found`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === task.createdBy.toString();
    console.log(isAdmin);
    console.log(isOwner);
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('Not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('username')
    .notEmpty()
    .withMessage('A username is required to sign up')
    .isLength({ min: 4, max: 25 })
    .withMessage('Your username must be between 4 and 25 characters'),
  body('email')
    .notEmpty()
    .withMessage('An email is required to sign up')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await UserList.findOne({ email });
      if (user) {
        throw new BadRequestError('An account with that email already exists');
      }
    }),
  body('password')
    .isLength({ min: 5, max: 20 })
    .withMessage('Your password must be between 5 and 20 characters'),
]);

export const validateLoginInput = [
  body('email_username')
    .notEmpty()
    .withMessage('You must enter an email or username'),
  body('password').notEmpty().withMessage('You must enter a password'),
];

export const validateEditUserInput = withValidationErrors([
  body('username')
    .notEmpty()
    .withMessage('A username is required')
    .isLength({ min: 4, max: 25 })
    .withMessage('Your username must be between 4 and 25 characters'),
  body('email')
    .notEmpty()
    .withMessage('An email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await UserList.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('An account with that email already exists');
      }
    }),
]);
