import { createLogger, format, transports } from 'winston';
import { DailyRotateFile } from 'winston-daily-rotate-file';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/%DATE%-results.log',
      datePattern: 'YYYY-MM-DD',
      delimiter: '-'
    }),
    new transports.Console(),
  ],
});

export default logger;
