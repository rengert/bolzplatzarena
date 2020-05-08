import moment, { Moment, MomentInput } from 'moment';
import { v4 as uuid } from 'uuid';

export function createUuid(): string {
  return uuid();
}

export function randomMoment(start: MomentInput, end: MomentInput): Moment {
  const endTime = +moment(end);
  const randomNumber = (to: number, from = 0): number =>
    Math.floor(Math.random() * (to - from) + from);

  if (start !== undefined) {
    const startTime = +moment(start);
    if (startTime > endTime) {
      throw new Error('End date is before start date!');
    }

    return moment(randomNumber(endTime, startTime));
  }

  return moment(randomNumber(endTime));
}

export function distance(start: { latitude: number, longitude: number }, end: { latitude: number, longitude: number }): number {
  if ((start.latitude === end.latitude)
    && (start.longitude === end.longitude)) {
    return 0;
  }
  // Calculating Distance between Points
  let result = 0;
  const pi = 3.14159265;
  const halfCircle = 180;
  const radians: number = halfCircle / pi;
  const metersInMile = 1609.34;
  const radius = 3958.8;
  const radiusOfEarth = radius * metersInMile;
  const lt1 = start.latitude / radians;
  const lg1 = start.longitude / radians;
  const lt2 = end.latitude / radians;
  const lg2 = end.longitude / radians;

  // radius of earth in miles (3,958.8) * metres in a mile * position on surface of sphere...
  result = radiusOfEarth * Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(lg2 - lg1));

  return result / 1000;
}
