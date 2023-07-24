import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class HighScoreTableComponent implements OnChanges {
  @Input() gameMode: GameMode;

  readonly data$: Observable<Highscore[]>;

  private readonly mode = new BehaviorSubject<GameMode>(GameMode.normal);

  constructor(highscore: HighscoreService) {
    this.data$ = this.mode.pipe(
      switchMap(mode => highscore.getByMode$(mode)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mode.next(this.gameMode);
  }
}
