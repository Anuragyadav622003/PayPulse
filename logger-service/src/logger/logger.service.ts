import { Injectable } from '@nestjs/common';
import { LoggerConfig } from './logger.config';
import { formatLog } from '../utils/formatter.util';

@Injectable()
export class LoggerService {
  private readonly level: string;
  private readonly serviceName: string;

  constructor(config: LoggerConfig) {
    this.serviceName = config.serviceName;
    this.level = config.level || 'info';
  }

  debug(message: string, meta?: any) {
    if (['debug'].includes(this.level)) {
      console.debug(formatLog(this.serviceName, message, meta));
    }
  }

  info(message: string, meta?: any) {
    if (['debug', 'info'].includes(this.level)) {
      console.log(formatLog(this.serviceName, message, meta));
    }
  }

  warn(message: string, meta?: any) {
    if (['debug', 'info', 'warn'].includes(this.level)) {
      console.warn(formatLog(this.serviceName, message, meta));
    }
  }

  error(message: string, meta?: any) {
    console.error(formatLog(this.serviceName, message, meta));
  }
}
