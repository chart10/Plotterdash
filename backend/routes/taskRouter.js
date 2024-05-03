import { Router } from 'express';
const router = Router();
import { validateTaskInput } from '../middleware/ValidationMiddleware.js';
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
  .get(getSingleTask)
  .patch(validateTaskInput, editTask)
  .delete(deleteTask);

export default router;
