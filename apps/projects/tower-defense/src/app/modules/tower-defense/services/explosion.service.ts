import { Injectable } from '@angular/core';
import { Color3, Color4, ParticleHelper, ParticleSystem, Texture, Vector3 } from '@babylonjs/core';
import { EngineService } from './engine.service';

@Injectable({
  providedIn: 'root',
})
export class ExplosionService {
  private texture: Texture;

  constructor(
    private readonly engine: EngineService,
  ) {
  }

  init(): void {
    this.texture = new Texture('assets/textures/explosion.png', this.engine.scene);
  }

  do(position: Vector3, large = false): void {
    const fireBlast = ParticleHelper.CreateDefault(position, 100);
    const fireBlastHemisphere = fireBlast.createHemisphericEmitter(.1, 0);

    // Set emission rate
    fireBlast.emitRate = 500;
    // Start size
    fireBlast.minSize = large ? 0.1 : 0.05;
    fireBlast.maxSize = large ? 1 : 0.25;
    // Lifetime
    fireBlast.minLifeTime = 0.1;
    fireBlast.maxLifeTime = large ? 2 : 1;
    // Emission power
    fireBlast.minEmitPower = large ? 1 : 0.125;
    fireBlast.maxEmitPower = large ? 2 : 0.25;

    // Limit velocity over time
    fireBlast.addLimitVelocityGradient(0, 40);
    fireBlast.addLimitVelocityGradient(0.120, 12.983);
    fireBlast.addLimitVelocityGradient(0.445, 1.780);
    fireBlast.addLimitVelocityGradient(0.691, 0.502);
    fireBlast.addLimitVelocityGradient(0.930, 0.05);
    fireBlast.addLimitVelocityGradient(1.0, 0);

    fireBlast.limitVelocityDamping = 0.9;

    // Start rotation
    fireBlast.minInitialRotation = -Math.PI / 2;
    fireBlast.maxInitialRotation = Math.PI / 2;

    // Texture
    fireBlast.particleTexture = this.texture.clone();
    fireBlast.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD;

    // Color over life
    fireBlast.addColorGradient(0.0, new Color4(1, 1, 1, 0));
    fireBlast.addColorGradient(0.1, new Color4(1, 1, 1, 1));
    fireBlast.addColorGradient(0.9, new Color4(1, 1, 1, 1));
    fireBlast.addColorGradient(1.0, new Color4(1, 1, 1, 0));

    // // Defines the color ramp to apply
    fireBlast.addRampGradient(0.0, new Color3(1, 1, 1));
    fireBlast.addRampGradient(0.09, new Color3(209 / 255, 204 / 255, 15 / 255));
    fireBlast.addRampGradient(0.18, new Color3(221 / 255, 120 / 255, 14 / 255));
    fireBlast.addRampGradient(0.28, new Color3(200 / 255, 43 / 255, 18 / 255));
    fireBlast.addRampGradient(0.47, new Color3(115 / 255, 22 / 255, 15 / 255));
    fireBlast.addRampGradient(0.88, new Color3(14 / 255, 14 / 255, 14 / 255));
    fireBlast.addRampGradient(1.0, new Color3(14 / 255, 14 / 255, 14 / 255));
    fireBlast.useRampGradients = true;

    // Defines the color remapper over time
    fireBlast.addColorRemapGradient(0, 0, 0.1);
    fireBlast.addColorRemapGradient(0.2, 0.1, 0.8);
    fireBlast.addColorRemapGradient(0.3, 0.2, 0.85);
    fireBlast.addColorRemapGradient(0.35, 0.4, 0.85);
    fireBlast.addColorRemapGradient(0.4, 0.5, 0.9);
    fireBlast.addColorRemapGradient(0.5, 0.95, 1.0);
    fireBlast.addColorRemapGradient(1.0, 0.95, 1.0);

    // Particle system start
    fireBlast.disposeOnStop = true;
    fireBlast.start(30);
    fireBlast.targetStopDuration = .4;

    // Animation update speed
    fireBlast.updateSpeed = 1 / 60;

    // Rendering order
    fireBlast.renderingGroupId = 1;
  }
}
