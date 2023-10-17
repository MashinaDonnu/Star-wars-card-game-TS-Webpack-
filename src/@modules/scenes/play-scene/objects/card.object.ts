import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IAbstractObjectParams } from '@engine/objects/engine-object';

export class CardObject extends Engine.Objects.Sprite {
  constructor(scene: EngineScene, params: IAbstractObjectParams) {
    super(scene, params);
  }
}
