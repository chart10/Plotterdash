import { Router } from 'express';
const router = Router();
import {
  validateTaskInput,
  validateMongoId,
} from '../middleware/ValidationMiddleware.js';
import {
  getAllTasks,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
} from '../services/taskServices.js';

router.route('/').get(getAllTasks).post(validateTaskInput, createTask);
router
  .route('/:id')
  .get(validateMongoId, getSingleTask)
  .patch(validateTaskInput, validateMongoId, editTask)
  .delete(validateMongoId, deleteTask);

export default router;
