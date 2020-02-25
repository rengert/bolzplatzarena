import { Player } from './player.model';

export interface Game {
  currentPlayerIndex: number;
  players: Player[];
  shuffleMaxCount: number;
  currentPlayer: Player;
  nextPlayer: boolean;
  maxRounds: number;
}
