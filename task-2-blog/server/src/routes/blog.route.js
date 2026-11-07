import { Router } from 'express'
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blog.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { blogValidator } from '../validators/blog.validator.js';
import { authenticateAuthor, authMiddleware } from './../middlewares/auth.middleware.js';
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
router.get("/", getAllBlogs);
router.put('/update/:id', authMiddleware, authenticateAuthor, upload.single("featuredImage"), blogValidator, validate, updateBlog);
router.delete("/delete/:id", authMiddleware, authenticateAuthor, deleteBlog);
export const blogRoutes = router;