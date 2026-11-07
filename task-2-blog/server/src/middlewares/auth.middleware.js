import jwt  from 'jsonwebtoken';
import { config } from '../config/config.js';
export const authMiddleware = (req, res, next) => { 
    const token = req.headers.authorization.split(" ")[1];
    if (!token) { 
        return res.status(401).json({
            message:"Token not found"
        })
    }
    const isValid = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    if (!isValid) { 
        return res.status(401).json({
            message:"Invalid token"
        })
    }
    const user = jwt.decode(token);
    req.user = user;
    next();
}