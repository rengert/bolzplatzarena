import { Pipe, PipeTransform } from '@angular/core';

interface TrackByCoordCache {
  [coord: string]: (index: number, item: any) => any;
}

const cache: TrackByCoordCache = {};

@Pipe({ name: 'trackByCoord' })
export class TrackByCoordPipe implements PipeTransform {
  transform(coord: { prop1: string, prop2: string }): (index: number, item: any) => any {
    const key = `${coord.prop1}-${coord.prop2}`;
    if (cache[key] !== null) {
      cache[key] = (index: number, item: any): string =>
        (`${item[coord.prop1]}-${item[coord.prop2]}`);
    }

    return (cache[key]);
  }
}
