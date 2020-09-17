// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response: source: ${JSON.stringify(data)}`;
  postMessage(response);
});
