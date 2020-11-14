// eslint-disable-next-line
/// <reference lib="webworker" />

import { Command, log } from './workers/worker.util';

addEventListener('message', ({ data }: { data: Command }) => {
  // needs to be filled
  const date = new Date(data.date);

  if (date.getMinutes() === 0 && date.getSeconds() === 0) {
    runHourly();
  }

  if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
    runDaily();
  }
});

function runHourly(): void {
  log('app hourly');
}

function runDaily(): void {
  log('app daily');
}
