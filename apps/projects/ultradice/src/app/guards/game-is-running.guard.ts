import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Injectable({ providedIn: 'root' })
export class GameIsRunningGuard implements CanActivate {
  constructor(private readonly data: DataService, private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.data.getGame()
      .pipe(
        map(game => {
          const gameStarted = game && !game.players.length;
          if (!gameStarted) {
            void this.router.navigate(['create']);
          }

          return true;
        }),
      );
  }
}
