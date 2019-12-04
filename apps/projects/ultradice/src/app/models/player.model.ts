import { GameCard } from './game-card.model';

export class Player {
  constructor() {
    this.name = '';
    this.gameCard = new GameCard();
  }

  id?: number;
  name: string;
  gameCard: GameCard;
  isCurrent: boolean;
}
