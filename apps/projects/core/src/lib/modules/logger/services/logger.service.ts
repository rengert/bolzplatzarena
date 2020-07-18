import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Logger, Message, Verbosity } from '../models/interfaces';

export const LOGGER = new InjectionToken<Logger>('Logger');

function createMessage<T>(message: string, component = 'unknown', verbosity = Verbosity.Debug): Message {
  return {
    text: message,
    component,
    verbosity,
  };
}

@Injectable({ providedIn: 'root' })
export class LoggerService<T> {
  name: string;

  constructor(@Inject(LOGGER) private readonly logger: Logger[] = []) {
  }

  debug(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.Debug));
  }

  error(message: string, data?: any): void {
    this.logMessage(createMessage(message, this.name, Verbosity.Error));
  }

  info(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.Info));
  }

  warning(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.Warning));
  }

  private logMessage(message: Message): void {
    this.logger.forEach(logger => logger.log(message));
  }
}
