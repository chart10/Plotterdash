import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  editUser,
} from '../services/userServices.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/edit-user', editUser);

export default router;
