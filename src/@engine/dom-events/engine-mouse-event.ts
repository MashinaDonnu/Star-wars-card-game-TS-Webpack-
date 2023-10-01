import { EngineObject } from '@engine/objects/engine-object';
import { IEngineDomMouseEvent } from '@engine/engine-dom-events';
import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';

export class EngineMouseEvent extends AbstractEngineEvent {
  constructor(private object: EngineObject) {
    super();
  }

  mouseDown(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousedown', callback);
  }

  mouseUp(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseup', callback);
  }

  mouseMove(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mousemove', callback);
  }

  mouseEnter(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseenter', callback);
  }

  mouseLeave(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseleave', callback);
  }

  mouseOver(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseover', callback);
  }

  mouseOut(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseout', callback);
  }

  private mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void) {
    const eventListenerCallback = (e: MouseEvent) => {
      const context = this.object.sys.context;

      if (context instanceof CanvasRenderingContext2D) {
        const mouseX = e.clientX - context.canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - context.canvas.getBoundingClientRect().top;

        if (this.isEntered(mouseX, mouseY)) {
          callback({ event: e, mouseX, mouseY });
        }
      }
    };

    this.on(mouseEvent, eventListenerCallback);
  }

  private isEntered(mouseX: number, mouseY: number) {
    const object = this.object;
    return mouseX >= object.x && mouseX <= object.x + object.width && mouseY >= object.y && mouseY <= object.y + object.height;
  }
}
