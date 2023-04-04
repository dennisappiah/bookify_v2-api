"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    // passs jwt tokens as request headers to auth endpoints
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied. Unaunthorized');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token');
    }
};
exports.default = auth;
