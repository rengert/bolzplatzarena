import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService implements Logger {
  debug(message: string): void {
    // tslint:disable-next-line:no-console
    console.debug(message);
  }

  error(message: string, data: any): void {
    console.error(message, data);
  }

  log(message: string): void {
    // tslint:disable-next-line:no-console
    console.log(message);
  }
}
