import { EngineObject } from '@engine/objects/engine-object';
import { TemplateObject } from '@engine/objects/template-object';

export class ObjectLayout {
  justify = {
    center: () => {
      const { x, y } = this.object.getCoords();
      const { width, height } = this.object.getSize();
      const context = this.object.sys.context;
      const canvas = context.canvas;
      const currentWidth = canvas.clientWidth;
      const currentHeight = canvas.clientHeight;

      this.object.x = currentHeight / 2 - width / 2;
    },
  };

  constructor(private object: EngineObject) {}
}
