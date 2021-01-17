import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TowerDefenseService } from '../../../../services/tower-defense.service';

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadyComponent {
  constructor(private readonly towerDefesnse: TowerDefenseService) {
  }

  start(): void {
    this.towerDefesnse.start();
  }
}
