import { IEngineObject } from '@engine/types/engine-object.interface';

export interface IEngineDomEvent {
  mouseX: number;
  mouseY: number;
}

export interface IEngineDomMouseEvent extends IEngineDomEvent {
  event: MouseEvent;
}

export class EngineDomEvents {
  constructor(private object: IEngineObject) {}

  mouseDown(callback: (evt?: IEngineDomMouseEvent) => void): void {
    document.addEventListener('mousedown', (e: MouseEvent) => {
      const context = this.object.sys.context;

      if (context instanceof CanvasRenderingContext2D) {
        const mouseX = e.clientX - context.canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - context.canvas.getBoundingClientRect().top;

        if (this.isEntered(mouseX, mouseY)) {
          callback({ event: e, mouseX, mouseY });
        }
      }
    });
  }

  private isEntered(mouseX: number, mouseY: number) {
    const object = this.object;
    return mouseX >= object.x && mouseX <= object.x + object.width && mouseY >= object.y && mouseY <= object.y + object.height;
  }
}
