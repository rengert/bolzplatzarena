import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Player } from '../../../../models/player.model';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-end-result',
  templateUrl: './end-result.component.html',
  styleUrls: ['./end-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndResultComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(public dialogRef: MatDialogRef<EndResultComponent>, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.players$ = this.dataService.getGame().pipe(
      map(game => game.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
    );
  }

  async close() {
    await this.dataService.cleanUpGame();
    this.dialogRef.close();
    await this.router.navigate(['']);
  }
}
