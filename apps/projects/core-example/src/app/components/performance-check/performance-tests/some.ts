import { Test } from '../performance-test/performance-test.component';

const array = [...Array(2500)
  .keys()];

export const someTest: Test = {
  name: 'some vs. find',
  loop: 10000,
  scenarios: [
    {
      name: 'some',
      method: some,
    },
    {
      name: '!!find',
      method: find,
    },
  ],
};

function some(): void {
  array.some(a => a === 2000);
}

function find(): void {
  !array.filter(a => a === 2000);
}
