import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import Blog from '../models/blog.model.js';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }
    const isValid = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    if (!isValid) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
    const user = jwt.decode(token);
    req.user = user;
    next();
}

export const authenticateAuthor = async (req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            message:"Blog not found"
        })
    }
    if (blog.author.toString() !== req.user.id) { 
        return res.status(401).json({
            message:"User not authorized"
        })
    }
    next();
}