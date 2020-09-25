export interface Command {
  command: string;
  date: string;
}

export function log(message: string): void {
  // tslint:disable-next-line:no-console
  console.log(message);
}
