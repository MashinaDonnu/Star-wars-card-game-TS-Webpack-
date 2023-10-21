import { Engine } from '@engine/engine';
import { ITemplateObjectParams } from '@engine/objects/template-object';

export class EngineTemplate {
  constructor(private engine: Engine) {}

  render(config: ITemplateObjectParams) {
    console.log('CONFIG:', config.fill);
    const context = this.engine.context;
    if (context instanceof CanvasRenderingContext2D) {
      const { fill, width, height, x, y, radius = 0 } = config;

      if (fill) {
        context.fillStyle = fill;
      }

      if (x && y && width && height && radius === undefined) {
        context.fillRect(x, y, width, height);
      }

      if (x && y && width && height && radius !== undefined) {
        this.roundRect(x, y, width, height, radius);
      }

      if (fill) {
        context.fill();
      }
    }
  }

  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    const context = this.engine.context;
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
    return this;
  }
}
