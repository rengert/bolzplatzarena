import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Logger, Message, Verbosity } from '../models/interfaces';

export const LOGGER = new InjectionToken<Logger>('Logger');

function createMessage<T>(message: string, component = 'unknown', verbosity = Verbosity.debug): Message {
  return {
    text: message,
    component,
    verbosity,
  };
}

@Injectable({ providedIn: 'root' })
export class LoggerService<T> {
  name: string;

  constructor(@Optional() @Inject(LOGGER) private readonly logger: Logger[] = []) {
  }

  debug(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.debug));
  }

  error(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.error));
  }

  info(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.info));
  }

  warning(message: string): void {
    this.logMessage(createMessage(message, this.name, Verbosity.warning));
  }

  private logMessage(message: Message): void {
    this.logger.forEach(logger => logger.log(message));
  }
}
