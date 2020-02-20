import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Game } from '../../../../models/game.model';
import { Player } from '../../../../models/player.model';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameComponent {
  readonly player1 = new Player();
  readonly player2 = new Player();
  readonly player3 = new Player();
  readonly player4 = new Player();

  constructor(
    private readonly data: DataService,
    private readonly router: Router,
  ) {
  }

  startGame(): void {
    const playersList = new Array<Player>();
    if (this.player1.name !== '') {
      playersList.push(this.player1);
    }
    if (this.player2.name !== '') {
      playersList.push(this.player2);
    }
    if (this.player3.name !== '') {
      playersList.push(this.player3);
    }
    if (this.player4.name !== '') {
      playersList.push(this.player4);
    }
    if (playersList.length > 0) {
      const game = new Game();
      game.players = playersList;
      this.data.createGame(game)
        .pipe(
          take(1),
        )
        .subscribe(result => {
          void this.router.navigate(['game']);
        });
    }
  }
}
