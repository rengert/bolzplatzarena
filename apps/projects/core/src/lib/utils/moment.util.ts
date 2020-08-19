import moment, { Moment } from 'moment';

export function createMoment(...args: MomentInput): Moment {
  return moment(args);
}
