import { createLogger, format, transports } from 'winston';
import { timestamp } from 'winston-timestamp';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'application.log',
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export function logInfo(message: string) {
    logger.info(message);
}

export function logError(message: string) {
    logger.error(message);
}

export default logger;
