const BONUS = 50;
const BONUS_LIMIT = 63;

export class GameCard {
  round = 0;

  ones?: number;
  twos?: number;
  threes?: number;
  fours?: number;
  fives?: number;
  six?: number;

  sumUpper = 0;
  bonus?: number;

  onePair?: number;
  twoPair?: number;

  threeOfAKind?: number;
  fourOfAKind?: number;
  fiveOfAKind?: number;

  shortStreet?: number;
  largeStreet?: number;

  fullHouse: number;
  chance?: number;

  sumLower = 0;
  sum = 0;

  static recalculate(card: GameCard): void {
    card.sumUpper = GameCard.getValueOrDefault(card.ones)
      + GameCard.getValueOrDefault(card.twos)
      + GameCard.getValueOrDefault(card.threes)
      + GameCard.getValueOrDefault(card.fours)
      + GameCard.getValueOrDefault(card.fives)
      + GameCard.getValueOrDefault(card.six);
    if (card.sumUpper >= BONUS_LIMIT) {
      card.bonus = BONUS;
    }
    card.sumLower = GameCard.getValueOrDefault(card.onePair);
    card.sumLower += GameCard.getValueOrDefault(card.twoPair);
    card.sumLower += GameCard.getValueOrDefault(card.threeOfAKind);
    card.sumLower += GameCard.getValueOrDefault(card.fourOfAKind);
    card.sumLower += GameCard.getValueOrDefault(card.fullHouse);
    card.sumLower += GameCard.getValueOrDefault(card.shortStreet);
    card.sumLower += GameCard.getValueOrDefault(card.largeStreet);
    card.sumLower += GameCard.getValueOrDefault(card.fiveOfAKind);
    card.sumLower += GameCard.getValueOrDefault(card.chance);
    card.sum = card.sumLower + card.sumUpper + GameCard.getValueOrDefault(card.bonus);
  }

  static getValueOrDefault(value?: number): number {
    return value ? value : 0;
  }
}
