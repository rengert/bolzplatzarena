export interface Command {
  command: string;
  date: string;
}

export function log(message: string): void {
  // eslint-disable-next-line no-console
  console.log(message);
}
