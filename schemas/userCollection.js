"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
    },
    // roles:[], roles assigned to users
    // operations: []set of user operations
});
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
    }, `${process.env.JWT_SECRET}`);
    return token;
};
exports.User = mongoose_1.default.model("User", userSchema);
const validateUser = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        // joi-password complexity for complex passwords
        password: joi_1.default.string().min(5).max(255).required(),
        isAdmin: joi_1.default.boolean(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
