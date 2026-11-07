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
            slug:title.toLowerCase().split(" ").join("_"),
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