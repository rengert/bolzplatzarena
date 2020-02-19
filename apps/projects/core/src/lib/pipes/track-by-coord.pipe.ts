import { Pipe, PipeTransform } from '@angular/core';

interface TrackByCoordCache {
  [coord: string]: <T>(index: number, item: T) => any;
}

const cache: TrackByCoordCache = {};

@Pipe({ name: 'trackByCoord' })
export class TrackByCoordPipe implements PipeTransform {
  transform(coord: { prop1: string, prop2: string }): (index: number, item: any) => any {
    const key = `${coord.prop1}-${coord.prop2}`;
    if (!cache[key]) {
      cache[key] = <T>(index: number, item: T): any =>
        (`${item[coord.prop1]}-${item[coord.prop2]}`);
    }

    return (cache[key]);
  }
}
