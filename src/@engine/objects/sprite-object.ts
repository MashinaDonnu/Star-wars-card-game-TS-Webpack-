import { EngineObject, IAbstractObjectParams } from '@engine/objects/engine-object';
import { EngineScene } from '@engine/scenes/engine-scene';

export class SpriteObject extends EngineObject {
  constructor(scene: EngineScene, params: IAbstractObjectParams) {
    super(scene, params);
  }

  init() {}

  render(): void {
    const context = this.sys.context;

    if (context instanceof CanvasRenderingContext2D) {
      this.scene.renderSceneSprite(this.spriteName, {
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
        rotate: this.rotate,
      });
    }
  }
}
