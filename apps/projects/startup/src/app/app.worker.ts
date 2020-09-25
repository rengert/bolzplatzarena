// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

import { Command } from './workers/worker.util';

addEventListener('message', ({ data }: { data: Command }) => {
  // needs to be filled
});
