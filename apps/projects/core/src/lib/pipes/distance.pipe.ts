import { Pipe, PipeTransform } from '@angular/core';
import { distance } from '../utils/common.util';

@Pipe({ name: 'distance' })
export class DistancePipe implements PipeTransform {
  transform(
    value: { latitude: number; longitude: number; },
    end: { latitude: number; longitude: number; },
  ): number {
    return distance(value, end);
  }
}
