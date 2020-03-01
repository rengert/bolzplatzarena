import { Injectable } from '@angular/core';
import { ConsoleLoggerService } from './console-logger.service';

export interface Logger {
  log(message: string): void;

  debug(message: string): void;

  error(message: string, data: any): void;
}

function createMessage(message: string): string {
  // const type = (typeof T).toString();

  return message;
}

@Injectable({ providedIn: 'root' })
export class LoggerService<T> implements Logger {
  private readonly logger: Logger[] = [];

  constructor(private readonly consoleLogger: ConsoleLoggerService) {
    this.logger.push(consoleLogger);
  }

  debug(message: string): void {
    const logMessage = createMessage(message);
    this.logger.forEach(logger => {
      logger.debug(logMessage);
    });
  }

  error(message: string, data: any): void {
    const logMessage = createMessage(message);
    this.logger.forEach(logger => {
      logger.error(logMessage, data);
    });
  }

  log(message: string): void {
    const logMessage = createMessage(message);
    this.logger.forEach(logger => {
      logger.log(logMessage);
    });
  }
}
