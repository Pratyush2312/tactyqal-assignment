import bcrypt from 'bcryptjs';
import User from './../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { createTokens, hashToken, verifyToken } from '../services/auth.service.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role
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
        const isProduction = config.NODE_ENV === 'production';
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "Login Successfull",
            accessToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}


export const hydrateUser = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }

        const decoded = verifyToken(token);
        const oldHash = hashToken(token);

        const { accessToken, refreshToken } = createTokens(decoded._id);

        const user = await User.findOneAndUpdate(
            {
                _id: decoded._id,
                refreshToken: oldHash
            },
            {
                $set: {
                    refreshToken: hashToken(refreshToken)
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        
        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: config.NODE_ENV === "production",
                sameSite: "none",
                path: "/"
            });

            return res.status(401).json({
                message: "Invalid or revoked refresh token"
            });
        }
        const isProduction = config.NODE_ENV === 'production';
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Tokens refreshed",
            accessToken,
            user
        });

    } catch (error) {
        console.log(error)
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "none",
            path: "/"
        });

        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};


export const logoutController = async (req, res) => { 
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "none",
            path: "/"
        });
        return res.status(201).json({
            message:"User logged out"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}