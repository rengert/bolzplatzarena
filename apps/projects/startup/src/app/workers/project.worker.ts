// eslint-disable-next-line
/// <reference lib="webworker" />

import { Command, log } from './worker.util';

log('project worker started');

addEventListener('message', ({ data }: { data: Command }) => {
  const date = new Date(data.date);

  if (date.getMinutes() === 0 && date.getSeconds() === 0) {
    runHourly();
  }

  if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
    runDaily();
  }
});

function runHourly(): void {
  log('project hourly');
}

function runDaily(): void {
  log('project daily');
}
