import { engineData } from '@engine/engine-data';
import { Engine } from '@engine/Engine';
import { GLOBAL_NAMESPACE } from '@engine/const';

export interface ISpriteConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  prerenderX?: number;
  prerenderY?: number;
  isPrivate?: boolean;
  // ....
}

export class EngineSprite {
  constructor(
    private namespace: string,
    private engine: Engine
  ) {}
  render(name: string, config: ISpriteConfig) {
    const context = this.engine.context;
    const image = this.get(name, !!config.isPrivate);

    const { x, y, width, height } = config;

    if (context instanceof CanvasRenderingContext2D) {
      // context.clearRect(0, 0, 640, 360);
      context.drawImage(image, x, y);
    }
  }

  get(name: string, isPrivate: boolean = false) {
    const namespace = isPrivate ? this.namespace : GLOBAL_NAMESPACE;
    return engineData.loaders.image.get(namespace).get(name);
  }
}
