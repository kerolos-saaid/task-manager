import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};