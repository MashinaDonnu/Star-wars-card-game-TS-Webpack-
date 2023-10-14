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

function mouseenter(fn: Function, object: EngineObject) {
  console.log('mouseenter');
  return function (...args: any[]) {
    if (object.isCursorEnter) {
      return;
    }

    return fn(...args);
  };
}

function mouseleave(fn: Function, object: EngineObject) {
  console.log('mouseleave');
  return function (...args: any[]) {
    if (!object.isCursorEnter) {
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
    this.mouseEvent('mousemove', mouseenter(callback, this.object));
  }

  mouseLeave(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousemove', mouseleave(callback, this.object), false);
  }

  mouseOver(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseover', callback);
  }

  mouseOut(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseout', callback);
  }

  mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void, forEnter: boolean = true): void {
    const eventListenerCallback = (e: MouseEvent) => {
      const context = this.object.sys.context;

      if (context instanceof CanvasRenderingContext2D) {
        const rect = context.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const isEntered = this.isEntered(mouseX, mouseY);

        if (isEntered && forEnter) {
          callback({ event: e, mouseX, mouseY });
          this.object.isCursorEnter = true;
        }

        if (!isEntered && !forEnter) {
          callback({ event: e, mouseX, mouseY });
          this.object.isCursorEnter = false;
        }
      }
    };

    if (!this.object.sys.disabledEvents) {
      this.on(mouseEvent, isDisabled(eventListenerCallback, this.object.sys));
    }
  }

  protected isEntered(mouseX: number, mouseY: number): boolean {
    const object = this.object;
    const { x, y } = object.getCoords();
    const { width, height } = object.getSize();
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }
}
