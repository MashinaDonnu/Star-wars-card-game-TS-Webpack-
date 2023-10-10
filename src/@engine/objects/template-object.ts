import { EngineObject, IAbstractObjectParams } from '@engine/objects/engine-object';
import { EngineScene } from '@engine/scenes/engine-scene';

export interface ITemplateObjectParams extends IAbstractObjectParams {
  fill?: string;
}

export class TemplateObject extends EngineObject {
  constructor(
    scene: EngineScene,
    protected params: ITemplateObjectParams
  ) {
    super(scene, params);
  }

  init() {}

  render() {
    this.scene.renderSceneTemplate(this.spriteName, this.params);
  }
}
