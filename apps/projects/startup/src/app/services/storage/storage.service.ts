import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { List, orderBy } from 'lodash';
import { firstValueFrom, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;

@Injectable({ providedIn: 'root' })
export class StorageService extends StorageMap {
  watch$<T, R = unknown>(
    key: string,
    sort: ListIterator<T, R>,
    direction: (boolean | 'desc' | 'asc')[] = ['desc'],
    count = 1000): Observable<T[]> {

    return this.watch(key).pipe(
      filter(data => !!data),
      map(data => data as T[]),
      map(data => orderBy<T>(data, sort, direction)),
      map(data => data.slice(0, count)),
    );
  }

  getEntity<T>(key: string): Promise<T> {
    return firstValueFrom(this.get(key).pipe( map(data => data as T)));
  }

  setEntity<T>(key: string, data: T): Promise<void> {
    return this.set(key, data).pipe(first()).toPromise();
  }
}
