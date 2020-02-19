import { Pipe, PipeTransform } from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T>(index: number, item: T) => any;
}

const cache: TrackByFunctionCache = {};

@Pipe({ name: 'trackByProperty' })
export class TrackByPropertyPipe implements PipeTransform {
  transform(propertyName: string): (index: number, item: any) => any {
    if (!cache[propertyName]) {
      cache[propertyName] = <T>(index: number, item: T): any =>
        (item[propertyName]);
    }

    return (cache[propertyName]);
  }
}
