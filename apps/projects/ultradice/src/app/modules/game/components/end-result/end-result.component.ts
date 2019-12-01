import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Player } from '../../../../models/player.model';
import { DataService } from '../../../../services/data.service';
import { switchMap, map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-result',
  templateUrl: './end-result.component.html',
  styleUrls: ['./end-result.component.scss']
})
export class EndResultComponent implements OnInit {
  players$: Observable<Player[]>;
  sortedPlayers: Player[];
  subscription: Subscription;

  constructor(public dialogRef: MatDialogRef<EndResultComponent>, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.players$ = this.dataService.getGame().pipe(
      map(game => this.sortedPlayers = game.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
      switchMap(players => of(players)),
    );
  }

  close() {
    // delete data
    this.subscription = this.dataService.cleanUpGame().subscribe((somethingWeCanIgnore) => {
      this.dialogRef.close();
      // redirect
      this.router.navigate(['']);
    });
  }
}
