// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

import { log } from './workers/worker.util';

addEventListener('message', ({ data }) => {
  const response = `app worker response: source: ${ JSON.stringify(data) }`;
  // tslint:disable-next-line:no-console
  log(response);
});
