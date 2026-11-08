import bcrypt from 'bcryptjs';
import User from './../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { createTokens, hashToken, verifyToken } from '../services/auth.service.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        return res.status(201).json({
            message: "User Registered"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not registered"
            })
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const { accessToken, refreshToken } = createTokens(user._id);
        await User.findByIdAndUpdate(user._id,
            { $set: { refreshToken: hashToken(refreshToken) } },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        console.log(user.refreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Login Successfull",
            accessToken
        })
    } catch (error) {   
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

export const hydrateUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const decoded = verifyToken(token);
        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== hashToken(token)) {

            return res.status(401).json({
                message: "Invalid tokens"
            })
        }
        const { accessToken, refreshToken } = createTokens(decoded._id);
        await User.findByIdAndUpdate(decoded._id,
            { $set: { refreshToken: hashToken(refreshToken) } },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Tokens refreshed",
            accessToken
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Intenal Server Error"
        })
    }
}