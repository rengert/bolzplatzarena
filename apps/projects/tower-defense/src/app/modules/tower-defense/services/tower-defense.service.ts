import { ElementRef, Injectable } from '@angular/core';
import { ActionManager } from '@babylonjs/core';
import { EngineService } from './engine.service';

@Injectable({
  providedIn: 'root',
})
export class TowerDefenseService {
  constructor(private readonly engine: EngineService) {
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    const scene = this.engine.createScene(canvas.nativeElement, { width: 100, height: 100 });

    scene.actionManager = new ActionManager(scene);

    scene.registerBeforeRender(() => {
      this.beforeRender();
    });
    scene.registerAfterRender(() => {
      this.afterRender();
    });
  }

  private beforeRender(): void {
  }

  private afterRender(): void {
  }
}
