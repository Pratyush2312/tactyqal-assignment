import { Router } from 'express'
import { createBlog } from '../controllers/blog.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { blogValidator } from '../validators/blog.validator.js';
import { authMiddleware } from './../middlewares/auth.middleware.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1204,
        files: 1
    }
})

const router = Router();
router.post("/create", authMiddleware, upload.single("featuredImage"), blogValidator, validate, createBlog);

export const blogRoutes = router;