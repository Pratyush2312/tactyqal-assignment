import { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validator.middleware.js';
import { hydrateUser, loginController, registerController } from '../controllers/auth.controller.js';
import { authMiddleware } from './../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginValidator, validate, loginController);
router.post('/register', registerValidator, validate, registerController);
router.post('/me', authMiddleware, hydrateUser);
export const authRoutes = router;