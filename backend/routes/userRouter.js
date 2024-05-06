import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  editUser,
} from '../services/userServices.js';
import { validateEditUserInput } from '../middleware/ValidationMiddleware.js';
import { authenticateAdmin } from '../middleware/AuthMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authenticateAdmin('admin'), getApplicationStats);
router.patch('/edit-user', validateEditUserInput, editUser);

export default router;
