"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = exports.Category = exports.categorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
exports.Category = mongoose_1.default.model('Category', exports.categorySchema);
const validateCategory = (category) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(category);
};
exports.validateCategory = validateCategory;
