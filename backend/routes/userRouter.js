import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  editUser,
} from '../services/userServices.js';
import { validateEditUserInput } from '../middleware/ValidationMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/edit-user', validateEditUserInput, editUser);

export default router;
