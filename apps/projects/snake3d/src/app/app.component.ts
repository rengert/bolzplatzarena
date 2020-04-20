import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Direction } from '../../../snake/src/app/app.constants';
import { getDirection } from '../../../snake/src/app/modules/board/services/directions.util';
import { EngineService } from './services/engine.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'snake3d';

  @ViewChild('rendererCanvas', { static: true }) private readonly rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private readonly engine: EngineService, private readonly game: GameService) {
  }

  ngOnInit(): void {
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
