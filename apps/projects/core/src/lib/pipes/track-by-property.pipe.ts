import { Pipe, PipeTransform } from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: (index: number, item: any) => string;
}

const cache: TrackByFunctionCache = {};

@Pipe({ name: 'trackByProperty' })
export class TrackByPropertyPipe implements PipeTransform {
  transform(propertyName: string): (index: number, item: any) => string {
    if (!cache[propertyName]) {
      cache[propertyName] = (index: number, item: any): string =>
        (item[propertyName]);
    }

    return (cache[propertyName]);
  }
}
