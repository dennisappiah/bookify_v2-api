import expressWiston from "express-winston"
import logger from "../middlewares/logger"


export const setupLogging = (app: any) => {
    process.on('unhandledRejection', (ex) => {
       throw ex;
    });
    
    app.use(expressWiston.logger({
        winstonInstance : logger,
        statusLevels : true 
    }));
}