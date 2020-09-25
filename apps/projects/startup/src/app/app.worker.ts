// tslint:disable-next-line:comment-type
/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `app worker response: source: ${ JSON.stringify(data) }`;
  // tslint:disable-next-line:no-console
  console.log(response);
});
