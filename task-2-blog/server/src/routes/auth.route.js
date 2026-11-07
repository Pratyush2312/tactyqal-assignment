import { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validator.middleware.js';
import { loginController, registerController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginValidator, validate, loginController);
router.post('/register', registerValidator, validate, registerController);

export const authRoutes = router;