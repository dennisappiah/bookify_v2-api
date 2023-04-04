"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categoryCollection_1 = require("../schemas/categoryCollection");
const joi_1 = __importDefault(require("joi"));
exports.Book = mongoose_1.default.model('Book', new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    category: {
        type: categoryCollection_1.categorySchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));
const validateBook = (book) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(5).max(50).required(),
        categoryId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        numberInStock: joi_1.default.number().min(0).required(),
        dailyRentalRate: joi_1.default.number().min(0).required()
    });
    return schema.validate(book);
};
exports.validateBook = validateBook;
