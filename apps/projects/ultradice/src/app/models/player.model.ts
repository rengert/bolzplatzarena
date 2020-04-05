import { GameCard } from './game-card.model';

export class Player {
  id?: number;
  name: string;
  gameCard: GameCard;
  isCurrent: boolean;

  constructor() {
    this.name = '';
    this.gameCard = {
      round: 0,
      sumUpper: 0,
      sumLower: 0,
      sum: 0,
    };
  }
}
