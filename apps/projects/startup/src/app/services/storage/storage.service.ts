import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { List, orderBy } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;

@Injectable({ providedIn: 'root' })
export class StorageService extends StorageMap {
  watch$<T, R = unknown>(
    key: string,
    sort: ListIterator<T, R>,
    direction: (boolean | 'desc' | 'asc')[] = ['desc'],
    count = 1000): Observable<T[]> {

    return this.watch<T[]>(key).pipe(
      filter(data => !!data),
      map(data => data as T[]),
      map(data => orderBy<T>(data, sort, direction)),
      map(data => data.slice(0, count)),
    );
  }
}
