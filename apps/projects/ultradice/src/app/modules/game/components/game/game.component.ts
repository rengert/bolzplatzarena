import { ChangeDetectionStrategy, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of, } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameService } from '../../../../services/game.service';
import { DataService } from '../../../../services/data.service';
import { GameCard } from '../../../../models/game-card.model';
import { DiceComponent } from '../dice/dice.component';
import { RuleService } from '../../../../services/rule.service';
import { Game } from '../../../../models/game.model';
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
    private ruleService: RuleService,
    private dataService: DataService,
    private readonly gameService: GameService,
    private readonly dialog: MatDialog,
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
        await dices[x].shuffel();
      }
      // this.gameCard.sum++;
      --this.game.shuffleMaxCount;
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
