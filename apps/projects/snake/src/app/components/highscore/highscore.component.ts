import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameMode } from '../../app.constants';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighscoreComponent {
  gameMode: GameMode = GameMode.normal;
  readonly modes = [
    { key: 'NORMAL', value: GameMode.normal },
    { key: 'NO_WALLS', value: GameMode.noWalls },
    { key: 'GOLDEN_APPLE', value: GameMode.goldenApple },
  ];
}
