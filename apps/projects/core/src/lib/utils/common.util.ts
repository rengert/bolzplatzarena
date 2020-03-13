import moment, { Moment, MomentInput } from 'moment';
import { v4 as uuid } from 'uuid';

export function createUuid(): string {
  return uuid();
}

export function randomMoment(start: MomentInput, end: MomentInput): Moment {
  const endTime = +moment(end);
  const randomNumber = (to: number, from = 0): number =>
    Math.floor(Math.random() * (to - from) + from);

  if (start) {
    const startTime = +moment(start);
    if (startTime > endTime) {
      throw new Error('End date is before start date!');
    }

    return moment(randomNumber(endTime, startTime));
  }

  return moment(randomNumber(endTime));
}
