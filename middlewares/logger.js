"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// import 'winston-mongodb'
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            level: 'debug',
            filename: 'logWarning.log'
        }),
        new winston_1.transports.File({
            level: 'info',
            filename: 'logInfo.log'
        }),
        // new transports.MongoDB({
        //     db : `${process.env.DB}`,
        //     options: {useNewUrlParser: true, useUnifiedTopology: true},
        //     collection : 'logs',
        //     level: 'error'
        // })
    ],
    exceptionHandlers: [
        new winston_1.transports.Console({ handleExceptions: true })
    ],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.timestamp(), winston_1.format.metadata(), winston_1.format.prettyPrint())
});
exports.default = logger;
