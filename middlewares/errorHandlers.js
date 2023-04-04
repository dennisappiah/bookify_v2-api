"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("./logger"));
const errorHandler = (error, req, res, next) => {
    // log errors from application
    logger_1.default.error(error.message, error);
    // handle all other errors
    res.status(500).send('Server Error');
};
exports.errorHandler = errorHandler;
