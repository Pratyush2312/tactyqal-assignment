import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategory } from '../controllers/category.controller.js';
import { categoryValidator } from './../validators/category.validator.js';
import { validate } from '../middlewares/validator.middleware.js';
import { authMiddleware, authorizeAdmin } from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/create', authMiddleware, authorizeAdmin, categoryValidator, validate, createCategory);
router.get('/', getAllCategory);
router.delete('/delete/:id', authMiddleware, authorizeAdmin, deleteCategory);
export const categoryRoutes = router;