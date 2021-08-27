import winston from 'winston';
import { v4 as uuidv4 } from 'uuid'; 

/*https://www.section.io/engineering-education/logging-with-winston/*/
const logConfiguration = {
    transports: [
        // new winston.transports.Console(),

        new winston.transports.File({
            level: 'info',
            filename: 'logs/server/server.log'    /*the log directory and file will be auto created if it does not exist*/
        })

        // new winston.transports.File({
        //     level: 'info',
        //     filename: 'logs/server/info.log'    /*the log directory and file will be auto created if it does not exist*/
        // }),
        // new winston.transports.File({
        //     level: 'warn',
        //     filename: 'logs/server/warn.log'    /*the log directory and file will be auto created if it does not exist*/
        // }),
        // new winston.transports.File({
        //     level: 'error',
        //     filename: 'logs/server/error.log'    /*the log directory and file will be auto created if it does not exist*/
        // })
    ],   
    format: winston.format.combine(
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.id}: requestId: ${info.requestId}: ${[info.timestamp]}: ${info.message}`)
    )
};
const logger = winston.createLogger(logConfiguration);



class Logger {

    constructor(req) {
        this.requestId = req ? req.id : undefined;
    }

    createLog(message) {
        return {
            message: message,
            id: uuidv4(),
            requestId: this.requestId,
        };
    }

    info(message) {
        const log = this.createLog(message);
        logger.info(log);
        return log.id;
    }

    error(message) {
        const log = this. createLog(message);
        logger.error(log);
        return log.id;
    }
}


export default Logger
export let ServerLogger = Logger