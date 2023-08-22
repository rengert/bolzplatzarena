import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameMode } from '../../../app.constants';
import { Highscore } from '../../../models/highscore.model';
import { HighscoreService } from '../../../services/highscore.service';

@Component({
  selector: 'app-high-score-table',
  templateUrl: './high-score-table.component.html',
  styleUrls: ['./high-score-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighScoreTableComponent {
  readonly data$: Observable<Highscore[]>;

  private readonly mode = new BehaviorSubject<GameMode>(GameMode.normal);

  constructor(highscore: HighscoreService) {
    this.data$ = this.mode.pipe(
      switchMap(mode => highscore.getByMode$(mode)),
    );
  }

  @Input() set gameMode(mode: GameMode) {
    this.mode.next(mode);
  }
}
