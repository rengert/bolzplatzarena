import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { Config } from '../../../../models/config';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  gameData: GameData;

  constructor(
    private readonly game: GameService,
    private readonly storage: StorageService,
  ) {
  }

  ngOnInit() {
    const config = this.storage.loadConfig();
    this.setupGame(config);
  }

  setupGame(config: Config) {
    this.gameData = this.storage.loadGame();
    if (!this.gameData) {
      this.gameData = this.game.createGameData(config);
    }
  }
}
