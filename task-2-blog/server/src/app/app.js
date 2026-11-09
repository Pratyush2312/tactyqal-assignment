import express from 'express';
import morgan from 'morgan';
import { authRoutes } from '../routes/auth.route.js';
import { blogRoutes } from '../routes/blog.route.js';
import { categoryRoutes } from '../routes/category.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes)
app.use('/api/category',categoryRoutes)
app.get('/', (req, res) => res.send({
    message: "Server running"
}))