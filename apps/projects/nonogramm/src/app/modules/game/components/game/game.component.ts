import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { Config } from '../../../../models/config';
import { WinScreenComponent } from '../win-screen/win-screen.component';
import { LoseScreenComponent } from '../lose-screen/lose-screen.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

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

  ngOnInit() {
    const config = this.storage.loadConfig();
    this.setupGame(config);
  }

  setupGame(config: Config) {
    this.gameData = this.storage.loadGame();
    if (!this.gameData) {
      this.gameData = this.game.createGameData(config);
    }
  }

  resultGame(result: boolean) {
    if (result) {
      this.win();
    } else {
      this.lose();
    }
  }

  private win() {
    const dialogRef = this.dialog.open(WinScreenComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.storage.cleanGame();
      this.router.navigate(['']);
    });
  }

  private lose() {
    const dialogRef = this.dialog.open(LoseScreenComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.gameData.current = [...this.gameData.data].map(
          row => row.map(block => ({ ...block }))
        );
        this.gameData = { ...this.gameData };
        this.change.detectChanges();
        return;
      }
      this.storage.cleanGame();
      this.router.navigate(['']);
    });
  }
}
