import { Injectable } from '@angular/core';
import { Color3, Mesh, StandardMaterial } from '@babylonjs/core';
import { EngineService } from './engine.service';

interface Snake {
  meshes: Mesh[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private snake: Snake;

  constructor(private readonly engine: EngineService) {
  }

  init(): void {
    this.snake = {
      meshes: [],
    };

    for (let i = 0; i < 10; i++) {
      const mesh = Mesh.CreateSphere(`ddd${i}`, 32, 0.5, this.engine.scene);
      mesh.position.y = 0.5;
      mesh.position.x = i * 0.5;
      this.snake.meshes.push(mesh);
    }
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(1, 0.2, 0.7);
    this.snake.meshes[0].material = material;
    this.nextFrame();
  }

  private nextFrame(): void {
    setTimeout(async () => {
      await this.updatePositions();
    }, 1);
  }

  private async updatePositions(): Promise<void> {
    for (const mesh of this.snake.meshes) {
      const rand = Math.ceil(Math.random() * 6);
      switch (rand) {
        case 1:
          if (mesh.position.x < 5) {
            mesh.position.x += 0.5;
          }
          break;
        case 2:
          if (mesh.position.x > -5) {
            mesh.position.x -= 0.5;
          }
          break;
        case 3:
          if (mesh.position.z < 5) {
            mesh.position.z += 0.5;
          }
          break;
        case 4:
          if (mesh.position.z > -5) {
            mesh.position.z -= 0.5;
          }
          break;
        default:
      }
    }

    this.nextFrame();
    return;
  }
}
