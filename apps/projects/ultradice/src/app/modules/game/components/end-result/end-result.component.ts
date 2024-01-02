import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrackByPropertyPipe } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { Player } from '../../../../models/player.model';
import { GameService } from '../../../../services/game.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-end-result',
  templateUrl: './end-result.component.html',
  styleUrls: ['./end-result.component.scss'],
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
export class EndResultComponent {
  protected readonly players: Player[];

  constructor(
    readonly dialogRef: MatDialogRef<EndResultComponent>,
    private readonly game: GameService,
    private readonly router: Router,
  ) {
    this.players = this.game.getGame()
      .players
      .sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1));
  }

  protected async close(): Promise<void> {
    await this.game.cleanUpGame();
    this.dialogRef.close();
    await this.router.navigate(['']);
  }
}
