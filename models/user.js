"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserModel {
    constructor(name, email, password, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    generateAuthToken() {
        const token = jsonwebtoken_1.default.sign({ _id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, `${process.env.JWT_SECRET}`);
        return token;
    }
}
exports.default = UserModel;
