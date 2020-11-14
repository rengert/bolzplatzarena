import { Injectable } from '@angular/core';
import { Logger, Message, Verbosity } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService implements Logger {
  log(message: Message): void {
    // eslint-disable-next-line no-console
    const { debug, info, error, warn } = console;
    let send: any;
    switch (message.verbosity) {
      case Verbosity.Error:
        send = error;
        break;
      case Verbosity.Info:
        send = info;
        break;
      case Verbosity.Warning:
        send = warn;
        break;
      default:
        send = debug;
        break;
    }
    send(`[${message.verbosity}] [${message.component}] ${message.text}`);
  }
}
