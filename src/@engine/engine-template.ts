import { Engine } from '@engine/engine';
import { ITemplateObjectParams } from '@engine/objects/template-object';

export class EngineTemplate {
  constructor(private engine: Engine) {}

  render(config: ITemplateObjectParams) {
    console.log('EngineTemplate');
    const context = this.engine.context;
    if (context instanceof CanvasRenderingContext2D) {
      const { fill, width, height, x, y } = config;

      if (fill) {
        context.fillStyle = fill;
      }

      if (x && y && width && height) {
        context.fillRect(x, y, width, height);
      }
    }
  }
}
