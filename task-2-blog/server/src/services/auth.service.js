import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import crypto from 'crypto';
export const createTokens = (id) => {
    const accessToken = jwt.sign({ _id: id }, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: id }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

export const verifyToken = (refreshToken) => { 
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
}

export const hashToken = (token) => { 
    return crypto.createHash('sha256').update(token).digest('hex');
}