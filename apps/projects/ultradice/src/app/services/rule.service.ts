import { Injectable } from '@angular/core';
import { GameCard } from '../models/game-card.model';

@Injectable({ providedIn: 'root' })
export class RuleService {
  handleRule(gameCard: GameCard, rule: number, dices: number[]): void {
    switch (rule) {
      case 1:
        gameCard.ones = this.getSimple(rule, dices);
        break;
      case 2:
        gameCard.twos = this.getSimple(rule, dices);
        break;
      case 3:
        gameCard.threes = this.getSimple(rule, dices);
        break;
      case 4:
        gameCard.fours = this.getSimple(rule, dices);
        break;
      case 5:
        gameCard.fives = this.getSimple(rule, dices);
        break;
      case 6:
        gameCard.six = this.getSimple(rule, dices);
        break;
      // one pair
      case 7:
        gameCard.onePair = this.getPair(dices, 1);
        break;
      // two pair
      case 8:
        gameCard.twoPair = this.getPair(dices, 2);
        break;
      // three of a kind
      case 9:
        gameCard.threeOfAKind = this.ofAKind(dices, 3);
        break;
      // four of a kind
      case 10:
        gameCard.fourOfAKind = this.ofAKind(dices, 4);
        break;
      case 11:
        gameCard.fullHouse = this.checkFullHouse(dices);
        break;
      case 12:
        gameCard.shortStreet = this.check(dices, [1, 2, 3, 4, 5]);
        break;
      case 13:
        gameCard.largeStreet = this.check(dices, [2, 3, 4, 5, 6]);
        break;
      // four of a kind
      case 14:
        gameCard.fiveOfAKind = this.ofAKind(dices, 5, 50);
        break;
      // four of a kind
      case 15:
        gameCard.chance = this.sum(dices);
        break;
      default:
        break;
    }
  }

  private readonly getSimple = (rule: number, dices: number[]): number => {
    let result = 0;
    dices.forEach(item => {
      if (item === rule) {
        result += item;
      }
    });

    return result;
  };

  private readonly getPair = (dices: number[], count: number): number => {
    let result = 0;
    const localDices = dices.sort()
      .reverse();
    for (let i = 0; i < localDices.length; i++) {
      if (dices.lastIndexOf(localDices[i]) !== i) {
        // etwas is doppelt enthalten
        const value = dices[i] * 2;
        if (value > result) {
          result = value;
        }
      }
    }

    if (count === 2 && result > 0) {
      const array = dices;
      array.splice(array.indexOf(result / 2), 1);
      array.splice(array.indexOf(result / 2), 1);
      const tempResult = this.getPair(array, 1);
      if (tempResult > 0) {
        result += tempResult;
      } else {
        result = 0;
      }
    }

    return result;
  };

  private ofAKind(dices: number[], count: number, preResult = 0): number {
    let result = 0;
    const groupedData = this.groupBy(dices);
    for (let i = 1; i <= 6; i++) {
      if (groupedData[i] >= count && count * i > result) {
        result = preResult || i * count;
      }
    }

    return result;
  }

  private check(dices: number[], check: number[]): number {
    const localDices = dices.sort();
    const localCheck = check.sort();
    let result = true;
    localDices.forEach((item, index) => {
      result = result && (item === localCheck[index]);
    });
    if (result) {
      return this.sum(dices);
    }

    return 0;
  }

  private checkFullHouse(dices: number[]): number {
    // drei gleich
    // zwei gleiche aber andere würfel
    let result = 0;
    const groupedData = this.groupBy(dices);
    for (let i = 1; i <= 6; i++) {
      if (groupedData[i] >= 2) {
        result += groupedData[i];
      }
    }
    if (result === 5) {
      return this.sum(dices);
    }

    return 0;
  }

  private readonly sum = (dices: number[]): number => {
    let result = 0;
    dices.forEach(item => result += item);

    return result;
  };

  private readonly groupBy = (data: number[]): any => {
    const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    data.forEach(item => {
      result[item]++;
    });

    return result;
  };
}
