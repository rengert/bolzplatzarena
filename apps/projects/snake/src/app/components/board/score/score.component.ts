import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScoreBoard } from '../../../models/score-board.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  @Input() scoreBoard: ScoreBoard;
}
