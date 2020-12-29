import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../../services/engine.service';
import { TowerDefenseService } from '../../services/tower-defense.service';

@Component({
  selector: 'app-tower-defense',
  templateUrl: './tower-defense.component.html',
  styleUrls: ['./tower-defense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TowerDefenseComponent implements OnInit {
  @ViewChild('canvasElement', { static: true }) private readonly canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly engine: EngineService,
    private readonly towerDefense: TowerDefenseService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.towerDefense.init(this.canvasElement);
    this.engine.animate();
  }
}
