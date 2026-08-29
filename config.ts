import * as fs from 'fs';
import * as path from 'path';

interface LogRotator {
  write(level: string, message: string): void;
}

class RotatingFileLogger implements LogRotator {
  private logPath: string;
  private maxSize: number;
  private maxFiles: number;
  private currentSize: number;
  constructor(logDir: string, maxSize: number = 10485760, maxFiles: number = 5) {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    this.logPath = path.join(logDir, 'app.log');
    this.maxSize = maxSize;
    this.maxFiles = maxFiles;
    this.currentSize = fs.existsSync(this.logPath) ? fs.statSync(this.logPath).size : 0;
  }
  write(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const entry = `${timestamp} [${level.toUpperCase()}] ${message}\n`;
    const entrySize = Buffer.byteLength(entry);
    if (this.currentSize + entrySize > this.maxSize) {
      this.rotate();
    }
    fs.appendFileSync(this.logPath, entry);
    this.currentSize += entrySize;
  }
  private rotate(): void {
    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = `${this.logPath}.${i}`;
      const newPath = `${this.logPath}.${i + 1}`;
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    }
    if (fs.existsSync(this.logPath)) {
      fs.renameSync(this.logPath, `${this.logPath}.1`);
    }
    this.currentSize = 0;
  }
}

const logDir = path.join(process.cwd(), 'logs');
const loggerInstance = new RotatingFileLogger(logDir);
export const logger = {
  info(message: string): void {
    loggerInstance.write('info', message);
  },
  error(message: string): void {
    loggerInstance.write('error', message);
  },
  warn(message: string): void {
    loggerInstance.write('warn', message);
  }
};