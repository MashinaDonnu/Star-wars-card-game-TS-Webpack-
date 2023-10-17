import { EngineObject } from '@engine/objects/engine-object';
import { IRect } from '@engine/types/rect';

export class ObjectLayout {
  justify = {
    center: (parentRect: IRect) => {
      const { x, y, width, height } = parentRect;
      return {
        x: x + (width / 2 - this.object.width / 2),
        y: this.object.y + (height / 2 - this.object.height / 2),
      };
    },
  };

  constructor(private object: EngineObject) {}
}
