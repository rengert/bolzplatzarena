import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Loading, Result, TowerDefenseService } from '../../services/tower-defense.service';
import { Observable, Subscription, timer } from 'rxjs';
import { delayWhen, tap } from 'rxjs/operators';
import { ResultComponent } from './dialogs/result/result.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tower-defense',
  templateUrl: './tower-defense.component.html',
  styleUrls: ['./tower-defense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TowerDefenseComponent implements AfterViewInit {
  @ViewChild('canvasElement', { static: true }) private readonly canvasElement: ElementRef<HTMLCanvasElement>;

  readonly loading$: Observable<Loading>;

  started = false;

  readonly subscription = Subscription.EMPTY;

  constructor(
    private readonly dialog: MatDialog,
    private readonly towerDefense: TowerDefenseService,
  ) {
    this.loading$ = this.towerDefense.loading$.pipe(
      delayWhen(loading => loading.steps === loading.finished ? timer(3000) : timer(1)),
      tap(loading => this.started = loading.steps === loading.finished),
    );

    this.subscription = this.towerDefense.result$.subscribe(result => this.openDialog(result));
  }

  async ngAfterViewInit(): Promise<void> {
    await this.towerDefense.init(this.canvasElement);
  }

  private openDialog(result: Result): void {
    this.dialog.open(ResultComponent, {
      data: result,
    });
  }
}
