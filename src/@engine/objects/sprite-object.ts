import { EngineObject, IAbstractObjectParams } from '@engine/objects/engine-object';
import { EngineScene } from '@engine/scenes/engine-scene';

export interface SpriteObjectParams extends IAbstractObjectParams {
  name: string;
}

export class SpriteObject extends EngineObject {
  name: string;
  constructor(scene: EngineScene, params: SpriteObjectParams) {
    super(scene, params);
    this.name = params.name;
  }

  render(): void {
    const context = this.sys.context;

    if (context instanceof CanvasRenderingContext2D) {
      this.scene.renderSceneSprite(this.name, {
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
      });
    }
  }
}
