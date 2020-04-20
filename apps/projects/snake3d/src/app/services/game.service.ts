import { Injectable } from '@angular/core';
import { Color3, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Direction } from '../../../../snake/src/app/app.constants';
import { getRelativeCoord } from '../utils/directions.util';
import { EngineService } from './engine.service';

interface Body {
  mesh: Mesh;
  targets: Vector3[];
}

interface Snake {
  body: Body[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  direction: Direction = Direction.Right;

  private snake: Snake;

  constructor(private readonly engine: EngineService) {
  }

  init(): void {
    this.snake = {
      body: [],
    };

    for (let i = 0; i < 125; i++) {
      const mesh = Mesh.CreateSphere(`ddd${i}`, 32, 0.5, this.engine.scene);
      mesh.position.y = 0.5;
      mesh.position.x = i * 0.5;
      this.snake.body.push({ mesh, targets: [] });
    }
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(1, 0.2, 0.7);
    this.snake.body[0].mesh.material = material;
    this.nextFrame();
  }

  private nextFrame(): void {
    setTimeout(async () => {
      await this.updatePositions();
    }, 8);
  }

  private async updatePositions(): Promise<void> {
    const coord = getRelativeCoord(this.direction);

    for (let i = 0; i < this.snake.body.length; i++) {
      const current = this.snake.body[i];
      const next = this.snake.body[i + 1];
      if (next) {
        next.targets.push(current.mesh.position.clone());
      }

      if (i === 0) {
        current.mesh.position.x += coord.x * 0.01;
        current.mesh.position.z += coord.y * 0.01;
      } else {
        // follow
        const target = current.targets[0];
        const delta = target.subtract(current.mesh.position)
          .normalize();

        current.mesh.position.x += delta.x > 0 ? 0.01 : 0;
        current.mesh.position.x -= delta.x < 0 ? 0.01 : 0;
        current.mesh.position.z += delta.z > 0 ? 0.01 : 0;
        current.mesh.position.z -= delta.z < 0 ? 0.01 : 0;

        if (target.equalsWithEpsilon(current.mesh.position)) {
          current.mesh.position = target.clone();
          current.targets.shift();
        }
      }
    }

    this.nextFrame();

    return;
  }
}
