import {createLogger, transports, format} from "winston"
// import 'winston-mongodb'

const logger = createLogger({
    transports : [
        new transports.Console(),
        new transports.File({
            level : 'debug',
            filename : 'logWarning.log'
        }),

        new transports.File({
            level : 'info',
            filename : 'logInfo.log'
        }),
        
        // new transports.MongoDB({
        //     db : `${process.env.DB}`,
        //     options: {useNewUrlParser: true, useUnifiedTopology: true},
        //     collection : 'logs',
        //     level: 'error'
        // })
    ],

    exceptionHandlers : [
        new transports.Console({ handleExceptions: true}) 
    ],

    format :  format.combine (
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint(),
    )
});


export default logger