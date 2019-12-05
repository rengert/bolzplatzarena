import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameData } from '../../../../models/game-data';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  gameData: GameData;

  constructor(private readonly game: GameService) {
  }

  ngOnInit() {
    this.setupGame();
  }

  setupGame() {
    console.log('start game');
    this.gameData = this.game.createGameData({ size: 15, level: 1 });
  }
}
