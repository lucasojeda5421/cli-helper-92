import { createLogger, transports, format } from 'winston';
import { Logger } from 'winston';

const logFormat = format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

const createRotatingLogger = (): Logger => {
    return createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'logs/combined.log',
                maxsize: 1024 * 1024 * 5,
                maxFiles: '5d',
                tailable: true,
            })
        ],
    });
};

const logger = createRotatingLogger();

export default logger;