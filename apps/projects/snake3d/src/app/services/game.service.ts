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

    for (let i = 0; i < 10; i++) {
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
    }, 16);
  }

  private async updatePositions(): Promise<void> {
    const coord = getRelativeCoord(this.direction);

    const head = this.snake.body[0];
    const body = this.snake.body[1];
    body.targets.push(head.mesh.position.clone());

    head.mesh.position.x += coord.x * 0.01;
    head.mesh.position.z += coord.y * 0.01;

    // follow
    const target = body.targets[0];
    console.log('target: ', target.x, target.z);
    console.log('mesh: ', body.mesh.position.x, body.mesh.position.z);

    const delta = target.subtract(body.mesh.position)
      .normalize();

    body.mesh.position.x += delta.x > 0 ? 0.01 : 0;
    body.mesh.position.x -= delta.x < 0 ? 0.01 : 0;
    body.mesh.position.z += delta.z > 0 ? 0.01 : 0;
    body.mesh.position.z -= delta.z < 0 ? 0.01 : 0;

    if (target.equalsWithEpsilon(body.mesh.position)) {
      body.mesh.position = target.clone();
      console.log('reached: ', body.targets.length);
      body.targets.shift();
      console.log('reached after: ', body.targets.length);
    }

    this.nextFrame();

    return;
  }
}
