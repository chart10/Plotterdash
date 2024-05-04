import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/CustomError.js';
import { TASK_STATUS } from '../../utils/constants.js';
import mongoose from 'mongoose';
import TaskList from '../daos/models/TaskModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        if (errorMessages[0].startsWith('no task')) {
          throw new NotFoundError(errorMessages);
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
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 character long')
    .trim(),
]);

export const validateTaskInput = withValidationErrors([
  body('title').notEmpty().withMessage('Title is required'),
  body('category')
    .isIn(Object.values(TASK_STATUS))
    .withMessage('Invalid category'),
]);

export const validateMongoId = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid Mongo ID');
    const task = await TaskList.findById(value);
    if (!task) throw new NotFoundError(`no task with id ${value} found`);
  }),
]);
