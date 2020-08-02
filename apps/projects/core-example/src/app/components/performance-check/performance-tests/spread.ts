import { Test } from '../performance-test/performance-test.component';

const array = [...Array(250000).keys()];

export const duplicateArrayTest: Test = {
  name: 'duplicate array',
  loop: 1000,
  scenarios: [
    {
      name: 'spread',
      method: spreadTest,
    },
    {
      name: 'concat',
      method: concatTest,
    },
    {
      name: 'slice',
      method: sliceTest,
    },
    {
      name: 'for',
      method: forTest,
    },
  ],
};

function spreadTest(): void {
  const data = [...array];
}

function concatTest(): void {
  // tslint:disable-next-line:ban-ts-ignore
  // @ts-ignore
  const data = [].concat(array);
}

function sliceTest(): void {
  const data = array.slice();
}

function forTest(): void {
  const data: number[] = [];
  for (const item of array) {
    data.push(item);
  }
}
