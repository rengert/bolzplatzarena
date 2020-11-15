export interface Logger {
  log(message: Message): void;
}

// eslint-disable-next-line no-shadow
export enum Verbosity {
  debug = 'debug',
  info = 'info',
  error = 'Error',
  warning = 'Warning',
}

export interface Message {
  text: string;
  verbosity: Verbosity;
  component: string;
  data?: any;
}
