import { ChangeDetectionStrategy, Component } from '@angular/core';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/firestore';
import { GameMode } from '../../app.constants';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighscoreComponent {
  gameMode: GameMode = GameMode.Normal;
  readonly GameMode = GameMode;

  modes = [
    { key: 'NORMAL', value: GameMode.Normal },
    { key: 'NO_WALLS', value: GameMode.NoWalls },
    { key: 'GOLDEN_APPLE', value: GameMode.GoldenApple },
  ];
}
