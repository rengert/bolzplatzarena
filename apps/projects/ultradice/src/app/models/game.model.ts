import { Player } from './player.model';

export interface Game {
  players: Player[];
  currentPlayerIndex: number;
  currentPlayer: Player;
  shuffleMaxCount: number;
  maxRounds: number;
  nextPlayer: boolean;
}
