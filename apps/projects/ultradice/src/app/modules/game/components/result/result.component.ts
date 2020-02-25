import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../../../../models/player.model';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(
    private readonly game: GameService,
    readonly dialogRef: MatDialogRef<ResultComponent>,
  ) {
  }

  ngOnInit(): void {
    this.players$ = this.game.getGame()
      .pipe(
        map(game => game.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
      );
  }
}
