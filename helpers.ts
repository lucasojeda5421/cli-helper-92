import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  logDir: string;
  maxFileSize: number;
  maxFiles: number;
}

export class CryptoLogger {
  private logFilePath: string;
  private config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.config = config;
    if (!fs.existsSync(this.config.logDir)) {
      fs.mkdirSync(this.config.logDir, { recursive: true });
    }
    this.logFilePath = path.join(this.config.logDir, 'crypto-cli.log');
  }

  public info(message: string): void {
    this.write('INFO', message);
  }

  public error(message: string): void {
    this.write('ERROR', message);
  }

  private write(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    this.rotateIfNeeded();
    fs.appendFileSync(this.logFilePath, logEntry, 'utf8');
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.logFilePath)) return;
    const stats = fs.statSync(this.logFilePath);
    if (stats.size < this.config.maxFileSize) return;

    for (let i = this.config.maxFiles - 1; i >= 1; i--) {
      const current = path.join(this.config.logDir, `crypto-cli.${i}.log`);
      const next = path.join(this.config.logDir, `crypto-cli.${i + 1}.log`);
      if (fs.existsSync(current)) {
        if (i === this.config.maxFiles - 1) {
          fs.unlinkSync(current);
        } else {
          fs.renameSync(current, next);
        }
      }
    }
    const firstBackup = path.join(this.config.logDir, 'crypto-cli.1.log');
    fs.renameSync(this.logFilePath, firstBackup);
  }
}