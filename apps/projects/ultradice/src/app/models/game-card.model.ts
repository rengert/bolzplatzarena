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

    public static recalculate(card: GameCard): void {
        card.sumUpper = GameCard.getValueOrDefault(card.ones)
                + GameCard.getValueOrDefault(card.twos)
                + GameCard.getValueOrDefault(card.threes)
                + GameCard.getValueOrDefault(card.fours)
                + GameCard.getValueOrDefault(card.fives)
                + GameCard.getValueOrDefault(card.six);
        card.bonus = card.sumUpper >= 63 ? 50 : null;
        card.sumLower =  GameCard.getValueOrDefault(card.onePair)
        + GameCard.getValueOrDefault(card.twoPair)
        + GameCard.getValueOrDefault(card.threeOfAKind)
        + GameCard.getValueOrDefault(card.fourOfAKind)
        + GameCard.getValueOrDefault(card.fullHouse)
        + GameCard.getValueOrDefault(card.shortStreet)
        + GameCard.getValueOrDefault(card.largeStreet)
        + GameCard.getValueOrDefault(card.fiveOfAKind)
        + GameCard.getValueOrDefault(card.chance);
        card.sum =  card.sumLower + card.sumUpper + GameCard.getValueOrDefault(card.bonus);
    }

    static getValueOrDefault(value?: number): number {
        if (typeof value === 'undefined') {
            return 0;
        }
        return value;
    }
}
