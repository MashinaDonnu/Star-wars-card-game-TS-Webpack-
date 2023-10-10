import { EngineObject } from '@engine/objects/engine-object';
import { IEngineDomMouseEvent } from '@engine/dom-events/engine-dom-events';
import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';
import { Engine } from '@engine';

function isDisabled(fn: Function, engine: Engine) {
  return function (...args: any[]) {
    if (engine.disabledEvents) {
      return;
    }

    return fn(...args);
  };
}

export class EngineMouseEvent extends AbstractEngineEvent {
  object: EngineObject;
  constructor(object: EngineObject) {
    super();
    this.object = object;
  }

  mouseDown(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousedown', callback);
  }

  mouseUp(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseup', callback);
  }

  mouseMove(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousemove', callback);
  }

  mouseEnter(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseenter', callback);
  }

  mouseLeave(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseleave', callback);
  }

  mouseOver(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseover', callback);
  }

  mouseOut(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseout', callback);
  }

  private mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void): void {
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

    if (!this.object.sys.disabledEvents) {
      this.on(mouseEvent, isDisabled(eventListenerCallback, this.object.sys));
    }
  }

  protected isEntered(mouseX: number, mouseY: number): boolean {
    const object = this.object;
    const { x, y } = this.calculateCoords(object.sys.context, object);
    const { width, height } = this.calculateSize(object.sys.context, object);
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }
}
