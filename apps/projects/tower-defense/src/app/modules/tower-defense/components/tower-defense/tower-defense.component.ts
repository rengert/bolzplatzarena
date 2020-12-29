import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { TowerDefenseService } from '../../services/tower-defense.service';

@Component({
  selector: 'app-tower-defense',
  templateUrl: './tower-defense.component.html',
  styleUrls: ['./tower-defense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TowerDefenseComponent {
  @ViewChild('canvasElement', { static: true }) private readonly canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(private readonly towerDefense: TowerDefenseService) {
  }

  ngAfterViewInit(): void {
    this.towerDefense.init(this.canvasElement);
  }
}
