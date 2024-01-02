import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Game } from '../../../../models/game.model';
import { Player } from '../../../../models/player.model';
import { GameService } from '../../../../services/game.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LinkButtonComponent } from '../../../shared/components/link-button/link-button.component';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ButtonComponent,
    LinkButtonComponent,
  ],
})
export class CreateGameComponent {
  readonly player1 = new Player();
  readonly player2 = new Player();
  readonly player3 = new Player();
  readonly player4 = new Player();

  constructor(
    private readonly game: GameService,
    private readonly router: Router,
  ) {
  }

  async startGame(): Promise<void> {
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
    if (playersList.length !== 0) {
      const game: Game = {
        currentPlayerIndex: 0,
        currentPlayer: playersList[0],
        nextPlayer: false,
        maxRounds: 15,
        players: playersList,
        shuffleMaxCount: 3,
      };
      await this.game.createGame(game)
        .then(() => {
          void this.router.navigate(['game']);
        });
    }
  }
}
