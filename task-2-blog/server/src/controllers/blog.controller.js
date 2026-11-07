import Blog from "../models/blog.model.js";
import { uploadImage } from "../services/storage.service.js";

export const createBlog = async (req, res) => {
    try {
        const { user } = req;
        console.log(user);
        const { title, content, excerpt, status } = req.body;
        const response = await uploadImage({ buffer: req.file.buffer, filename: req.file.originalname });
        const blog = await Blog.create({
            title,
            author: user.id,
            slug: title.toLowerCase().split(" ").join("_"),
            content,
            status,
            excerpt,
            featuredImage: {
                url: response.url,
                fileId: response.fileId
            }
        })
        return res.status(201).json({
            message: "Blog Created successfully",
            data: blog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return res.status(404).json({
                message: "No blogs found"
            })
        }
        return res.status(200).json({
            message: "Blogs Fetched",
            data: blogs
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const allowedFields = [
            "title",
            "status",
            "excerpt",
            "category",
            "content"
        ]
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) { 
                updates[field] = req.body[field];
            }
        }
        const blog = await Blog.findByIdAndUpdate(id,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );
        return res.status(200).json({
            message: "Blog Updated",
            data: blog
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Blog Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}