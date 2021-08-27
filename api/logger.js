import winston from 'winston';
import { v4 as uuidv4 } from 'uuid'; 

/*https://www.section.io/engineering-education/logging-with-winston/*/
const logConfiguration = {
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
            level: 'info',
            filename: 'logs/server/info.log'    /*the log directory and file will be auto created if it does not exist*/
        }),
        new winston.transports.File({
            level: 'warn',
            filename: 'logs/server/warn.log'    /*the log directory and file will be auto created if it does not exist*/
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/server/error.log'    /*the log directory and file will be auto created if it does not exist*/
        })
    ],   
    format: winston.format.combine(
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.id}: requestId: ${info.requestId}: ${[info.timestamp]}: ${info.message}`)
    )
};
const logger = winston.createLogger(logConfiguration);

/*
https://stackoverflow.com/questions/42432951/how-to-add-uuid-in-every-winston-log-node-js-per-request
in header "X-Request-Id"
but in request object id
*/
const requestIdHeader = "id";
const createLog = function(message, requestId) {
    return {
        message: message,
        id: uuidv4(),
        requestId: requestId,
    };
};



var logger_helper = {
    // log: function(level, message) {
    //     winstonLogger.log(level, formatMessage(message));
    // },
    info: function(message, requestId) {
        const log = createLog(message, requestId);
        logger.info(log);
        return log.id
    },
    error: function(message, requestId) {
        const log = createLog(message, requestId);
        logger.error(log);
        return log.id
    }
    // warn: function(message) {
    //     winstonLogger.warn(formatMessage(message));
    // },
    // verbose: function(message) {
    //     winstonLogger.verbose(formatMessage(message));
    // },
    // debug: function(message) {
    //     winstonLogger.debug(formatMessage(message));
    // },
    // silly: function(message) {
    //     winstonLogger.silly(formatMessage(message));
    // }
}; 

export default logger_helper
export let serverLogger = logger_helper