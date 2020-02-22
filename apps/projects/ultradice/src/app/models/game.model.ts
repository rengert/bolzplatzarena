import { Player } from './player.model';

export class Game {
  currentPlayerIndex = 0;
  players: Player[];
  shuffleMaxCount = 3;
  currentPlayer: Player;
  nextPlayer: boolean;
  maxRounds = 15;
}
