import { Engine } from '@engine';

export interface ICanvasData {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
}

export function getCanvasData(engine: Engine): ICanvasData {
  const context = engine.context;
  const canvas = context.canvas;
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;

  return { context, canvas, canvasWidth, canvasHeight };
}
