import { EngineObject } from '@engine/objects/engine-object';
import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';
import { Engine } from '@engine';
import { IEngineDomMouseEvent } from '@engine/dom-events/types/engine-dom-mouse-event.interface';
import { EngineMouseEvent } from '@engine/dom-events/engine-mouse-event';
import { getRectCoords } from '@engine/utils/helpers/get-rect-coords';

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

export class EngineObjectMouseEvent extends EngineMouseEvent {
  object: EngineObject;
  constructor(object: EngineObject) {
    super();
    this.object = object;
  }

  mouseEnter(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousemove', mouseenter(callback, this.object));
  }

  mouseLeave(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousemove', mouseleave(callback, this.object), false);
  }

  mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void, forEnter: boolean = true): void {
    const eventListenerCallback = (e: MouseEvent) => {
      const context = this.object.sys.context;
      const { mouseX, mouseY } = getRectCoords(e, context);
      const isEntered = this.isEntered(mouseX, mouseY);

      if (isEntered && forEnter) {
        callback({ event: e, mouseX, mouseY });
        this.object.isCursorEnter = true;
      }

      if (!isEntered && !forEnter) {
        callback({ event: e, mouseX, mouseY });
        this.object.isCursorEnter = false;
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
