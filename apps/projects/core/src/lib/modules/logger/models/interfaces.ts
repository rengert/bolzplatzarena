export interface Logger {
  log(message: Message): void;
}

export enum Verbosity {
  Debug = 'Debug',
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
}

export interface Message {
  text: string;
  verbosity: Verbosity;
  component: string;
  data?: any;
}
