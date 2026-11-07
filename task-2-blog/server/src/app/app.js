import express from 'express';

import { authRoutes } from '../routes/auth.route.js';
import { blogRoutes } from '../routes/blog.route.js';
export const app = express();
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes)

app.get('/', (req, res) => res.send({
    message: "Server running"
}))