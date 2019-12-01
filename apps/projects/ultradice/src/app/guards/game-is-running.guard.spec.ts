import { TestBed, async, inject } from '@angular/core/testing';

import { GameIsRunningGuard } from './game-is-running.guard';

describe('GameIsRunningGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameIsRunningGuard]
    });
  });

  it('should ...', inject([GameIsRunningGuard], (guard: GameIsRunningGuard) => {
    expect(guard).toBeTruthy();
  }));
});
