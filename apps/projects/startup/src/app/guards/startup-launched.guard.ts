import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StartupService } from '../services/startup.service';

@Injectable({ providedIn: 'root' })
export class StartupLaunchedGuard implements CanActivate {
  constructor(
    private readonly startup: StartupService,
    private readonly router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.startup.launched$().pipe(
      tap(result => {
        if (!result) {
          return this.router.navigate(['launch']);
        }

        return result;
      }),
    );
  }
}
