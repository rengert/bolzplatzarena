import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameCard } from '../../../../models/game-card.model';
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

  get gameCard() {
    if (!this.game.currentPlayer) {
      let index = this.game.players.findIndex(item => item.isCurrent);
      if (index < 0) {
        index = this.game.currentPlayerIndex;
      }
      this.game.currentPlayer = this.game.players[index];
    }
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

  private initGame$(): Observable<boolean> {
    return this.dataService.getGame().pipe(
      map(game => this.game = game),
      switchMap(game => of(game.players.length > 0)),
    );
  }

  ngOnDestroy() {
    this.gameService.state$.next(false);
  }

  async shuffle() {
    if (this.game.shuffleMaxCount > 0) {
      const dices = this.dices.toArray();
      // tslint:disable-next-line:prefer-for-of
      for (let x = 0; x < dices.length; x++) {
        await this.shuffelDice(dices[x]);
      }
      // this.gameCard.sum++;
      --this.game.shuffleMaxCount;
    }
    this.changeDetectionRef.markForCheck();
  }

  async shuffelDice(dice: DiceComponent) {
    if (dice.id === 0) {
      // error case
      return;
    }
    if (!dice.fixed) {
      dice.value = Math.ceil((Math.random() * 6));
      await this.dataService.updateShuffleStatistic(`dice.all`);
      await this.dataService.updateShuffleStatistic(`dice.value.${dice.value}`);
      await this.dataService.updateShuffleStatistic(`dice.${dice.id}.${dice.value}`);
    }
  }

  handleRule(rule: number) {
    if (this.game.shuffleMaxCount === 3 || this.game.nextPlayer) {
      // kleiner betrüger :P
      return;
    }
    // get dices
    const dices = new Array<number>();
    this.dices.forEach((item) => {
      dices.push(item.value);

      // reset the dice
      item.fixed = false;
    });

    // handle rule
    this.ruleService.handleRule(this.game.currentPlayer.gameCard, rule, dices);
    this.game.currentPlayer.gameCard.round++;
    GameCard.recalculate(this.game.currentPlayer.gameCard);
    // disable current rul

    // reset everything
    // this.shuffleMaxCount = 3;
    // check if game is over
    this.game.nextPlayer = true;

    this.dataService.updateGame(this.game);
  }

  next() {
    this.game.currentPlayerIndex++;
    if (this.game.currentPlayerIndex === this.game.players.length) {
      this.game.currentPlayerIndex = 0;
    }
    this.game.currentPlayer.isCurrent = false;
    this.game.currentPlayer = this.game.players[this.game.currentPlayerIndex];
    this.game.currentPlayer.isCurrent = true;


    if (this.game.currentPlayer.gameCard.round === this.game.maxRounds) {
      // spiel ist zu ende
      // prüfen, ob es einen spieler gibt
      if (this.game.players.filter(player => player.gameCard.round < this.game.maxRounds).length > 0) {
        // throw exception?
      }
// some statistics
      this.game.players.forEach(async player => {
        GameCard.recalculate(player.gameCard);
        await this.dataService.updateMax('GAME.RESULT.MAX', player.gameCard.sum);
        await this.dataService.updateMin('GAME.RESULT.MIN', player.gameCard.sum);
      });

      const dialogReference = this.dialog.open(EndResultComponent);
    } else {
      this.game.shuffleMaxCount = 3;
      this.game.nextPlayer = false;
      this.dataService.updateGame(this.game);
    }
  }
}
