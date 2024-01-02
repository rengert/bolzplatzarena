import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

export const GameIsRunningGuard: () => Promise<boolean> = async function GameIsRunningGuard(): Promise<boolean> {
  const game = inject(GameService);
  const router = inject(Router);
  if (!game.exists()) {
    return await router.navigate(['create']);
  }
  return true;
};

