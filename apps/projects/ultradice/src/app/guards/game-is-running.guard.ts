import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameIsRunningGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.dataService.getGame().pipe(
        switchMap(game => {
          // return to the create component
          if (typeof game === 'undefined' || game === null || game.players.length === 0) {
            console.log('nicht mit mir');
            this.router.navigate(['create']);
          }
          return of(typeof game !== 'undefined' && game !== null && game.players.length > 0);
        }),
    );
  }
}
