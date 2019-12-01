import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../../../models/player.model';
import { Router } from '@angular/router';
import { timeout, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Game } from '../../../../models/game.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  player1 = new Player();
  player2 = new Player();
  player3 = new Player();
  player4 = new Player();

  constructor(private data: DataService, private router: Router) { }

  startGame() {
    const playersList = new Array<Player>();
    if (this.player1.name !== '') {
      playersList.push(this.player1);
    }
    if (this.player2.name !== '') {
      playersList.push(this.player2);
    }
    if (this.player3.name !== '') {
      playersList.push(this.player3);
    }
    if (this.player4.name !== '') {
      playersList.push(this.player4);
    }
    if (playersList.length > 0)  {
      const game = new Game();
      game.players = playersList;
      this.data.createGame(game).pipe(
        take(1),
      ).subscribe((result) => {
        this.router.navigate(['game']);
      });
    }
  }

  ngOnInit() {
  }

}
