import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { GameService } from '../services/game.service';

@Injectable({ providedIn: 'root' })
export class GameIsRunningGuard  {
  constructor(private readonly game: GameService, private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (!this.game.exists()) {
      return this.router.navigate(['create']);
    }

    return true;
  }
}
