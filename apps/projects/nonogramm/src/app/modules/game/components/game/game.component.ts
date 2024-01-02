import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../../../models/config';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { BoardComponent } from '../../../board/components/board/board.component';
import { GameService } from '../../services/game.service';
import { LoseScreenComponent } from '../lose-screen/lose-screen.component';
import { WinScreenComponent } from '../win-screen/win-screen.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    BoardComponent,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
    TranslateModule
],
})
export class GameComponent implements OnInit {
  readonly gameData$ = new BehaviorSubject<GameData | undefined>(undefined);

  constructor(
    private readonly game: GameService,
    private readonly storage: StorageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
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
    this.gameData$.next(this.storage.loadGame() ?? this.game.createGameData(config));
  }

  private win(): void {
    const dialogRef = this.dialog.open(WinScreenComponent);
    dialogRef.afterClosed()
      .subscribe(async() => {
        this.storage.cleanGame();
        await this.router.navigate(['']);
      });
  }

  private lose(): void {
    const dialogRef = this.dialog.open(LoseScreenComponent);
    dialogRef.afterClosed()
      .subscribe(async(result: true | undefined) => {
        const current = this.gameData$.value;
        if (result === true && current) {
          this.gameData$.next({
            ...current,
            current: [...current.data].map(
              row => ({
                ...row,
                data: row.data.map(block => ({ ...block })),
              }),
            ),
            failed: 0,
          });
          return;
        }
        this.storage.cleanGame();
        void this.router.navigate(['']);
      });
  }
}
