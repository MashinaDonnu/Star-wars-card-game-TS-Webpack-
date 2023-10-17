import { EngineObject, IAbstractObjectParams } from '@engine/objects/engine-object';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IRect } from '@engine/types/rect';

export interface ITemplateObjectParams extends IAbstractObjectParams {
  fill?: string;
  radius?: number;
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
    this.scene.renderSceneTemplate(this.name, this.params);
  }

  clearRect(params: IRect) {
    const { x, y, width, height } = params;
    this.sys.context.clearRect(x, y, width, height);
  }
}
