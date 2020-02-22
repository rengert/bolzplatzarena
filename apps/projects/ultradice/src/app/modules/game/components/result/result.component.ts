import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../../../../models/player.model';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements OnInit {
  players$: Observable<Player[]>;

  constructor(
    readonly dialogRef: MatDialogRef<ResultComponent>,
    private readonly dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.players$ = this.dataService.getGame()
      .pipe(
        map(game => game !.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
      );
  }
}
