import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Loading, TowerDefenseService } from '../../services/tower-defense.service';
import { Observable, timer } from 'rxjs';
import { delayWhen, tap } from 'rxjs/operators';

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

  constructor(private readonly towerDefense: TowerDefenseService) {
    this.loading$ = this.towerDefense.loading$.pipe(
      tap(data => console.log(data)),
      delayWhen(loading => loading.steps === loading.finished ? timer(3000) : timer(1)),
      tap(loading => this.started = loading.steps === loading.finished),
    );
  }

  async ngAfterViewInit(): Promise<void> {
    await this.towerDefense.init(this.canvasElement);
  }
}
