import { log } from './worker.util';

log('project worker started');

addEventListener('message', ({ data }) => {
  const response = `project worker response: source: ${ JSON.stringify(data) }`;
  // postMessage(response);
  log(response);
});
