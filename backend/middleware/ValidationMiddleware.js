import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/CustomError.js';
import { TASK_STATUS } from '../../utils/constants.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      console.log(Object.values(TASK_STATUS));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json(errorMessages);
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
