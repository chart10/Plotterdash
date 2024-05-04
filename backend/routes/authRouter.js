import { Router } from 'express';
import { register, login } from '../services/authServices.js';
import { validateRegisterInput } from '../middleware/ValidationMiddleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', login);

export default router;
