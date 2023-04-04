"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEnv = void 0;
require("dotenv/config");
const configEnv = () => {
    if (process.env.NODE_ENV === "test") {
        require("dotenv").config({ path: ".env.test" });
    }
    else if (process.env.NODE_ENV === "production") {
        require("dotenv").config({ path: ".env.production" });
    }
    else {
        require("dotenv").config({ path: ".env.development" });
    }
};
exports.configEnv = configEnv;
//set NODE_ENV=test
