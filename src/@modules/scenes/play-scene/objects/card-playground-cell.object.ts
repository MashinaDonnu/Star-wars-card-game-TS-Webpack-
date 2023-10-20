import { Engine } from '@engine';
import { ITemplateObjectParams } from '@engine/objects/template-object';
import { EngineScene } from '@engine/scenes/engine-scene';

export class CardPlaygroundCellObject extends Engine.Objects.Template {
  constructor(scene: EngineScene, params: ITemplateObjectParams) {
    super(scene, params);
  }
}
