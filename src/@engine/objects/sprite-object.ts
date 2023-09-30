import { IEngineObject } from '@engine/types/engine-object.interface';
import { AbstractObject, IAbstractObjectParams } from '@engine/objects/abstract-object';
import { IScene } from '@engine/types/scene.interface';

export interface SpriteObjectParams extends IAbstractObjectParams {
  name: string;
}

export class SpriteObject extends AbstractObject {
  name: string;
  constructor(scene: IScene, params: SpriteObjectParams) {
    super(scene, params);
    this.name = params.name;
  }

  render(): void {
    const context = this.sys.context;

    if (context instanceof CanvasRenderingContext2D) {
      this.scene.sprites.render(this.name, {
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
      });
    }
  }
}
