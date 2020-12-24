import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Config } from '../../../../models/config';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { GameService } from '../../services/game.service';
import { LoseScreenComponent } from '../lose-screen/lose-screen.component';
import { WinScreenComponent } from '../win-screen/win-screen.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  gameData: GameData;

  constructor(
    private readonly game: GameService,
    private readonly storage: StorageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly change: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    const config = this.storage.loadConfig();
    this.setupGame(config);
  }

  resultGame(result: boolean): void {
    if (result) {
      this.win();

      return;
    }
    this.lose();
  }

  private setupGame(config: Config): void {
    this.gameData = this.storage.loadGame() ?? this.game.createGameData(config);
  }

  private win(): void {
    const dialogRef = this.dialog.open(WinScreenComponent);
    dialogRef.afterClosed()
      .subscribe(async () => {
        this.storage.cleanGame();
        await this.router.navigate(['']);
      });
  }

  private lose(): void {
    const dialogRef = this.dialog.open(LoseScreenComponent);
    dialogRef
      .afterClosed()
      .subscribe(async result => {
        if (result === true) {
          this.gameData.current = [...this.gameData.data].map(
            row => ({
              ...row,
              data: row.data.map(block => ({ ...block })),
            }),
          );
          this.gameData = { ...this.gameData };
          this.change.detectChanges();

          return;
        }
        this.storage.cleanGame();
        void this.router.navigate(['']);
      });
  }
}
