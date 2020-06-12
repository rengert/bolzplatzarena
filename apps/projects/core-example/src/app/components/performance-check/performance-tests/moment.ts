import moment from 'moment';
import { Test } from '../performance-test/performance-test.component';

export const createMomentTest: Test = {
  name: 'create moment',
  scenarios: [
    {
      name: 'create Moment',
      method: createMoment,
    },
    {
      name: 'create Date',
      method: createDateFromString,
    },
    {
      name: 'create Noment from Date',
      method: createMomentFromDate,
    },
  ],
};

function createMoment(): void {
  const data = moment('2011-01-01T12:12:12.123');
}

function createMomentFromDate(): void {
  const data = moment(new Date('2011-01-01T12:12:12.123'));
}

function createDateFromString(): void {
  const date = new Date('2011-01-01T12:12:12.123');
}
