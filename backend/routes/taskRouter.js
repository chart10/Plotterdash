import { Router } from 'express';
const router = Router();

import {
  getAllTasks,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
} from '../services/taskServices.js';

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(editTask).delete(deleteTask);

export default router;
