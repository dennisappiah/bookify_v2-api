"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLogging = void 0;
const express_winston_1 = __importDefault(require("express-winston"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const setupLogging = (app) => {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    app.use(express_winston_1.default.logger({
        winstonInstance: logger_1.default,
        statusLevels: true
    }));
};
exports.setupLogging = setupLogging;
