// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

import { createMoment } from '@bpa/core';
import { log } from './worker.util';

log('project worker started');

addEventListener('message', ({ data }) => {
  const response = `project worker: ${ JSON.stringify(data) }`;
  log(response);

  console.log(createMoment(data));
});
