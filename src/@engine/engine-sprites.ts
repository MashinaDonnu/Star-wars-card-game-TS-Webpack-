import { IEngine } from '@engine/types';
import { engineData } from '@engine/engine-data';
import { Engine } from '@engine/Engine';

export interface ISpriteConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  // ....
}

export class EngineSprites {
  constructor(
    private namespace: string,
    private engine: Engine
  ) {}
  render(name: string, config: ISpriteConfig) {
    const context = this.engine.context;
    const image = this.get(name);

    const { x, y, width, height } = config;

    if (context instanceof CanvasRenderingContext2D) {
      // context.clearRect(0, 0, 640, 360);
      context.drawImage(image, x, y);
    }
  }

  get(name: string) {
    return engineData.loaders.image.get(this.namespace).get(name);
  }
}
