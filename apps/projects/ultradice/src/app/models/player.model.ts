import { GameCard } from './game-card.model';

export class Player {
  id?: number;
  name: string;
  gameCard: GameCard;
  isCurrent: boolean;

  constructor() {
    this.name = '';
    this.gameCard = new GameCard();
  }
}
