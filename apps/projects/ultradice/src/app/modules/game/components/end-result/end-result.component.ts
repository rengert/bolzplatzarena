import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(
    readonly dialogRef: MatDialogRef<EndResultComponent>,
    private readonly dataService: DataService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.players$ = this.dataService.getGame()
      .pipe(
        map(game => game !.players.sort((a, b) => (a.gameCard.sum < b.gameCard.sum ? 1 : -1))),
      );
  }

  async close(): Promise<void> {
    await this.dataService.cleanUpGame();
    this.dialogRef.close();
    await this.router.navigate(['']);
  }
}
