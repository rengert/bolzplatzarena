import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Direction } from '../../../../../snake/src/app/app.constants';
import { getDirection } from '../../../../../snake/src/app/modules/board/services/directions.util';
import { EngineService } from '../../services/engine.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit {
  readonly result$ = this.game.result$;

  @ViewChild('rendererCanvas', { static: true }) private readonly rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private readonly engine: EngineService, private readonly game: GameService) {
  }

  ngAfterViewInit(): void {
    const scene = this.engine.createScene(this.rendererCanvas);
    this.game.init();
    this.engine.animate();
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.key as Direction);
  }

  handleDirection(direction: Direction): void {
    this.game.direction = getDirection(this.game.direction, direction);
  }
}
