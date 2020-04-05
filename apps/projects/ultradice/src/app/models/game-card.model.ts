import { getValueOrDefault } from '../services/utils';

const BONUS = 50;
const BONUS_LIMIT = 63;

export function recalculate(input: GameCard): GameCard {
  const card = { ...input };
  card.sumUpper = getValueOrDefault(card.ones)
    + getValueOrDefault(card.twos)
    + getValueOrDefault(card.threes)
    + getValueOrDefault(card.fours)
    + getValueOrDefault(card.fives)
    + getValueOrDefault(card.six);
  if (card.sumUpper >= BONUS_LIMIT) {
    card.bonus = BONUS;
  }
  card.sumLower = getValueOrDefault(card.onePair);
  card.sumLower += getValueOrDefault(card.twoPair);
  card.sumLower += getValueOrDefault(card.threeOfAKind);
  card.sumLower += getValueOrDefault(card.fourOfAKind);
  card.sumLower += getValueOrDefault(card.fullHouse);
  card.sumLower += getValueOrDefault(card.shortStreet);
  card.sumLower += getValueOrDefault(card.largeStreet);
  card.sumLower += getValueOrDefault(card.fiveOfAKind);
  card.sumLower += getValueOrDefault(card.chance);
  card.sum = card.sumLower + card.sumUpper + getValueOrDefault(card.bonus);

  return card;
}

export interface GameCard {
  round: number;

  ones?: number;
  twos?: number;
  threes?: number;
  fours?: number;
  fives?: number;
  six?: number;

  sumUpper: number;
  bonus?: number;

  onePair?: number;
  twoPair?: number;

  threeOfAKind?: number;
  fourOfAKind?: number;
  fiveOfAKind?: number;

  shortStreet?: number;
  largeStreet?: number;

  fullHouse?: number;
  chance?: number;

  sumLower: number;
  sum: number;
}
