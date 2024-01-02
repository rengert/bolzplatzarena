import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrackByPropertyPipe } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { Player } from '../../../../models/player.model';
import { GameService } from '../../../../services/game.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    NgClass,
    ButtonComponent,
    AsyncPipe,
    TrackByPropertyPipe,
  ],
})
export class ResultComponent {
  protected readonly players: Player[];

  constructor(
    readonly dialogRef: MatDialogRef<ResultComponent>,
    gameService: GameService,
  ) {
    const game = gameService.getGame();
    this.players =
      game.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1));
  }
}
