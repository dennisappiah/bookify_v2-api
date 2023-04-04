"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = exports.Customer = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.Customer = mongoose_1.default.model('Customer', new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
const validateCustomer = (customer) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        phone: joi_1.default.string().min(5).max(50).required(),
        isGold: joi_1.default.boolean(),
    });
    return schema.validate(customer);
};
exports.validateCustomer = validateCustomer;
