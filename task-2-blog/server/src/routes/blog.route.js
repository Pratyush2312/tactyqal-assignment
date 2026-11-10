import { Router } from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlogBySlug, getBlogsByUser, updateBlog } from '../controllers/blog.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { blogValidator } from '../validators/blog.validator.js';
import { authMiddleware, authorizeAuthor } from './../middlewares/auth.middleware.js';
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
router.get("/me", authMiddleware, getBlogsByUser);
router.put('/update/:id', authMiddleware, authorizeAuthor, upload.single("featuredImage"), blogValidator, validate, updateBlog);
router.delete("/delete/:id", authMiddleware, authorizeAuthor, deleteBlog);
router.get("/:slug", getBlogBySlug);
export const blogRoutes = router;