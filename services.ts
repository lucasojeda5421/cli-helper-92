import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const transport = new winston.transports.File({
    filename: path.join(logDir, 'app.log'),
    maxsize: 1024 * 1024 * 5, // 5MB
    maxFiles: '14d',
    tailable: true,
    zippedArchive: true,
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [transport],
});

export default logger;
