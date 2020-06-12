import { pullAllWith } from 'lodash';
import { Test } from '../performance-test/performance-test.component';

const array = [...Array(2500)
  .keys()];
const pullArray = [...Array(5)
  .keys()];

export const pullWithAllTest: Test = {
  name: 'lodash pullAll vs. plain ts',
  loop: 1000,
  scenarios: [
    {
      name: 'lodash pullAllWith',
      method: pullAllWithTest,
    },
    {
      name: 'pull with find',
      method: pullWithFind,
    },
  ],
};

function pullAllWithTest(): void {
  const localArray = [...array];
  pullAllWith(localArray, array, (a, b) => a === b);
}

function pullWithFind(): void {
  let localArray = [...array];
  localArray = localArray.filter(item => !pullArray.includes(item));
}
