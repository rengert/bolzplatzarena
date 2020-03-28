import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class HighScoreTableComponent implements OnChanges, OnInit {
  @Input() gameMode: GameMode;
  @Input() remote: boolean;

  readonly mode = new BehaviorSubject<GameMode>(GameMode.Normal);

  data$: Observable<Highscore[]>;

  constructor(
    private readonly highscore: HighscoreService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mode.next(this.gameMode);
  }

  ngOnInit(): void {
    this.data$ = this.mode.pipe(
      switchMap(mode => this.remote
        ? this.highscore.getRemote$(mode)
        : this.highscore.getByMode$(mode)),
    );
  }
}
