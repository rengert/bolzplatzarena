import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

function getTitle(route: ActivatedRoute): string | undefined {
  const title = route.snapshot.data.title;
  if (!title && !!route.firstChild) {
    return getTitle(route.firstChild);
  }

  return title;
}

@Injectable({ providedIn: 'root' })
export class TitleBarService {
  readonly title$: Observable<string | undefined>;

  constructor(private readonly router: Router, private readonly activedRoute: ActivatedRoute) {
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(_ => getTitle(this.activedRoute)),
    );
  }
}
