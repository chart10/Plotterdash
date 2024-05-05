import { Router } from 'express';
import { register, login } from '../services/authServices.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/ValidationMiddleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;
