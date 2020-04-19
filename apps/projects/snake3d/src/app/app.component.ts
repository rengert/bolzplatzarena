import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
}
