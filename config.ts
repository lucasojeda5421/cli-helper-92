import { createLogger, transports, format } from 'winston';
import { appendFileSync } from 'fs';
import { join } from 'path';

const logDirectory = join(__dirname, 'logs');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: join(logDirectory, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: '14d',
            zippedArchive: true
        }),
        new transports.File({
            filename: join(logDirectory, 'combined.log'),
            maxsize: 5242880,
            maxFiles: '14d',
            zippedArchive: true
        })
    ]
});

const logUsage = () => {
    appendFileSync(join(logDirectory, 'usage.log'), `${new Date().toISOString()} - Log accessed\n`);
};

export { logger, logUsage };