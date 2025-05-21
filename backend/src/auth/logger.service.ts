import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'failed-logins.log', level: 'error' }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  });

  logFailedLogin(username: string, reason: string) {
    this.logger.error({
      username,
      reason,
      timestamp: new Date().toISOString(),
    });
  }
}
