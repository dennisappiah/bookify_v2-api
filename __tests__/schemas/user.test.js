"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userCollection_1 = require("../../schemas/userCollection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe('user.generateAuthToken', () => {
    test('should return a valid JWT token', () => {
        const payload = { _id: new mongoose_1.default.Types.ObjectId().toHexString(), isAdmin: true };
        const user = new userCollection_1.User(payload);
        const token = user.generateAuthToken();
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        expect(decoded).toMatchObject(payload);
    });
});
