import { Player } from './../../../../models/player.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../../../services/data.service';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  players$: Observable<Player[]>;
  sortedPlayers: Player[];
  constructor(public dialogRef: MatDialogRef<ResultComponent>, private dataService: DataService) { }

  ngOnInit() {
    this.players$ = this.dataService.getGame().pipe(
      map(game => this.sortedPlayers = game.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
      switchMap(players => of(players)),
    );
  }
}
