import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameCard, recalculate } from '../../../../models/game-card.model';
import { Game } from '../../../../models/game.model';
import { DataService } from '../../../../services/data.service';
import { GameService } from '../../../../services/game.service';
import { RuleService } from '../../../../services/rule.service';
import { DiceComponent } from '../dice/dice.component';
import { EndResultComponent } from '../end-result/end-result.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnDestroy {
  @ViewChildren(DiceComponent) dices: QueryList<DiceComponent>;

  init$: Observable<any>;
  game: Game;

  get gameCard(): GameCard {
    return this.game.currentPlayer.gameCard;
  }

  constructor(
    private readonly ruleService: RuleService,
    private readonly dataService: DataService,
    private readonly gameService: GameService,
    private readonly dialog: MatDialog,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.init$ = this.initGame$();
    this.gameService.state$.next(true);
  }

  ngOnDestroy(): void {
    this.gameService.state$.next(false);
  }

  async shuffle(): Promise<void> {
    if (this.game.shuffleMaxCount > 0) {
      const dices = this.dices.toArray();
      for (let x = 0; x < dices.length; x++) {
        await this.shuffelDice(dices[x]);
      }
      // this.gameCard.sum++;
      this.game.shuffleMaxCount -= 1;
    }
    this.changeDetectionRef.markForCheck();
  }

  async shuffelDice(dice: DiceComponent): Promise<void> {
    if (dice.id === '0') {
      // error case
      return;
    }
    if (!dice.fixed) {
      dice.value = Math.ceil((Math.random() * 6));
      await this.dataService.updateShuffleStatistic('dice.all');
      await this.dataService.updateShuffleStatistic(`dice.value.${dice.value}`);
      await this.dataService.updateShuffleStatistic(`dice.${dice.id}.${dice.value}`);
    }
  }

  async handleRule(rule: number): Promise<void> {
    if (this.game.shuffleMaxCount === 3 || this.game.nextPlayer) {
      // kleiner betrüger :P
      return;
    }
    // get dices
    const dices = this.dices.map(dice => dice.value);
    this.dices.forEach(item => {
      item.fixed = false;
    });

    // handle rule
    this.ruleService.handleRule(this.game.currentPlayer.gameCard, rule, dices);
    this.game.currentPlayer.gameCard.round++;

    this.game.currentPlayer.gameCard = recalculate(this.game.currentPlayer.gameCard);

    this.game.nextPlayer = true;

    await this.gameService.updateGame(this.game);
  }

  async next(): Promise<void> {
    this.game.currentPlayerIndex++;
    if (this.game.currentPlayerIndex === this.game.players.length) {
      this.game.currentPlayerIndex = 0;
    }

    this.game.currentPlayer.isCurrent = false;
    this.game.currentPlayer = this.game.players[this.game.currentPlayerIndex];
    this.game.currentPlayer.isCurrent = true;

    if (this.game.currentPlayer.gameCard.round === this.game.maxRounds) {
      for (const player of this.game.players) {
        player.gameCard = recalculate(player.gameCard);
        await this.dataService.updateMax('GAME.RESULT.MAX', player.gameCard.sum);
        await this.dataService.updateMin('GAME.RESULT.MIN', player.gameCard.sum);
      }

      this.dialog.open(EndResultComponent);
    } else {
      this.game.shuffleMaxCount = 3;
      this.game.nextPlayer = false;
      await this.gameService.updateGame(this.game);
    }
  }

  private initGame$(): Observable<Game> {
    return this.gameService.getGame()
      .pipe(
        tap(game => this.game = game),
      );
  }
}
