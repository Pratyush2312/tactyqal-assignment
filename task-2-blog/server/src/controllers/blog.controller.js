import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import { deleteImage, uploadImage } from "../services/storage.service.js";

export const createBlog = async (req, res) => {
    try {
        const { user } = req;
        const { title, content, excerpt, category } = req.body;
        const blogWithSameName = await Blog.findOne({ title });
        if (blogWithSameName) {
            return res.status(403).json({
                message: "Blog with same title exists"
            })
        }
        const cat = await Category.findOne({ name: category });
        if (!cat) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        if (!req.file) {
            return res.status(400).json({
                message: "Featured Image is required"
            })
        }
        const response = await uploadImage({ buffer: req.file.buffer, filename: req.file.originalname });

        const blog = await Blog.create({
            title,
            author: user._id,
            slug: title.toLowerCase().split(" ").join("_"),
            content,
            excerpt,
            category: cat._id,
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
        const blogs = await Blog.find()
            .populate("category", "name slug")
            .populate("author", "name email")
            .sort({ createdAt: -1 });;
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

        if (req.body.category !== undefined) {
            const cat = await Category.findOne({ name: req.body.category });
            if (!cat) {
                return res.status(404).json({
                    message: "Category not found"
                })
            }
            updates['category'] = cat._id;
        }
        const blog = await Blog.findByIdAndUpdate(id,
            { $set: updates },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );
        console.log(blog);
        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            message: "Blog Updated",
            data: blog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        deleteImage(blog.featuredImage.fileId);
        return res.status(200).json({
            message: "Blog Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.find({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            message: "Blog Fetched",
            data: blog
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getBlogsByUser = async (req, res) => {
    try {
        const { user } = req;
        const blogs = await Blog.find({ author: user._id })
            .populate("category", "name slug")
            .sort({ createdAt: -1 });
        if (!blogs) {
            return res.status(404).json({
                message: "No blogs found"
            })
        }
        return res.status(200).json({
            message: "Blogs fetched",
            data: blogs,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id)
            .populate("category", "name slug")
            .sort({ createdAt: -1 });
        if (!blog) {
            return res.status(404).json({
                message:"Blog not found"
            })
        } 
        console.log(blog);
        return res.status(200).json({
            message: "Blog Fetched",
            data:blog
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}