import { getCanvasData } from 'common/utils/get-canvas-data';
import { EngineScene, IEngineSceneOptions } from '@engine/scenes/engine-scene';

export abstract class AbstractScene extends EngineScene {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  protected constructor(name: string, options?: IEngineSceneOptions) {
    super(name, options);
  }

  render() {
    const { canvas, context, canvasWidth, canvasHeight } = getCanvasData(this.sys);
    this.canvas = this.sys.context.canvas;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
}
