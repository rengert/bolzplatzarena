import { Dictionary } from 'lodash';
import moment, { Moment } from 'moment';
import { Test } from '../performance-test/performance-test.component';

export const createMomentCacheTest: Test = {
  name: 'create moment  cache',
  loop: 10,
  scenarios: [
    {
      name: 'create Moment',
      method: createMoment,
    },
    {
      name: 'create Moment using cache',
      method: createMomentFromCache,
    },
  ],
};

const dictionary: Dictionary<Moment> = {};

function getMoment(data: string): Moment {
  const result = dictionary[data] ?? moment(data);
  dictionary[data] = result;

  return result;
}

function createMoment(): void {
  for (let i = 1; i <= 31; i++) {
    moment(`2011-01-${i}T12:12:12.123`);
    moment(`2012-01-${i}T12:12:12.123`);
    moment(`2013-01-${i}T12:12:12.123`);
    moment(`2014-01-${i}T12:12:12.123`);
    moment(`2015-01-${i}T12:12:12.123`);
    moment(`2016-01-${i}T12:12:12.123`);
    moment(`2017-01-${i}T12:12:12.123`);
    moment(`2018-01-${i}T12:12:12.123`);
    moment(`2019-01-${i}T12:12:12.123`);
  }
}

function createMomentFromCache(): void {
  for (let i = 1; i <= 31; i++) {
    getMoment(`2011-01-${i}T12:12:12.123`);
    getMoment(`2012-01-${i}T12:12:12.123`);
    getMoment(`2013-01-${i}T12:12:12.123`);
    getMoment(`2014-01-${i}T12:12:12.123`);
    getMoment(`2015-01-${i}T12:12:12.123`);
    getMoment(`2016-01-${i}T12:12:12.123`);
    getMoment(`2017-01-${i}T12:12:12.123`);
    getMoment(`2018-01-${i}T12:12:12.123`);
    getMoment(`2019-01-${i}T12:12:12.123`);
  }
}
