// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

log('project worker started');

addEventListener('message', ({ data }) => {
  const response = `project worker response: source: ${ JSON.stringify(data) }`;
  // postMessage(response);
  log(response);
});

function log(message: string): void {
  // tslint:disable-next-line:no-console
  console.log(message);
}
