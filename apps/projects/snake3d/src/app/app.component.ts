import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from './services/engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'snake3d';

  @ViewChild('rendererCanvas', { static: true }) private readonly rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private readonly engine: EngineService) {
  }

  ngOnInit(): void {
    this.engine.createScene(this.rendererCanvas);
    this.engine.animate();
  }
}
