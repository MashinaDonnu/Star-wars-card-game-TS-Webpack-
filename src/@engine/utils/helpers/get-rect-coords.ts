import { TEngineContext } from '@engine';

export function getRectCoords(e: MouseEvent, context: TEngineContext): { mouseX: number; mouseY: number } {
  if (context instanceof CanvasRenderingContext2D) {
    const rect = context.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    return { mouseX, mouseY };
  }
}
