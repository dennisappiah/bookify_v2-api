"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const registerRoutes_1 = require("./startup/registerRoutes");
const integrateDb_1 = require("./startup/integrateDb");
// import { configEnv } from "./startup/setConfig";
const setLogging_1 = require("./startup/setLogging");
const app = (0, express_1.default)();
(0, setLogging_1.setupLogging)(app);
(0, registerRoutes_1.setupRoutes)(app);
(0, integrateDb_1.setupDb)();
// configEnv();
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
