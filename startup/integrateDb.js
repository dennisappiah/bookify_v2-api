"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setConfig_1 = require("./setConfig");
(0, setConfig_1.configEnv)();
const setupDb = () => {
    mongoose_1.default.connect(`${process.env.DB}`)
        .then(() => console.log(`Connected to ${process.env.DB}`))
        .catch(err => console.log("Could not connect to MongoDb..", err));
};
exports.setupDb = setupDb;
