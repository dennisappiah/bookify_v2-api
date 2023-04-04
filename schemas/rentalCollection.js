"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRental = exports.Rental = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
exports.Rental = mongoose_1.default.model('Rental', new mongoose_1.default.Schema({
    customer: {
        type: new mongoose_1.default.Schema({
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
        }),
        required: true
    },
    book: {
        type: new mongoose_1.default.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));
const validateRental = (rental) => {
    const schema = joi_1.default.object({
        customerId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        bookId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
    });
    return schema.validate(rental);
};
exports.validateRental = validateRental;
