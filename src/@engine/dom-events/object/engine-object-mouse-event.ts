import { EngineObject } from '@engine/objects/engine-object';
import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';
import { Engine } from '@engine';
import { IEngineDomMouseEvent } from '@engine/dom-events/types/engine-dom-mouse-event.interface';
import { EngineMouseEvent } from '@engine/dom-events/engine-mouse-event';
import { getRectCoords } from '@engine/utils/helpers/get-rect-coords';

export interface IMouseenterLeaveOptions {
  oneObject: boolean;
}

const MOUSE_EVENTS_DATA = {
  isEnabledOnceMouseenter: false,
  isEnabledOnceMouseleave: false,
  onceMouseenter: false,
  onceMouseleave: false,
};

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

    if (MOUSE_EVENTS_DATA.isEnabledOnceMouseenter && MOUSE_EVENTS_DATA.onceMouseenter) {
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

    // if (MOUSE_EVENTS_DATA.isEnabledOnceMouseleave && MOUSE_EVENTS_DATA.onceMouseenter) {
    //   return;
    // }

    if (MOUSE_EVENTS_DATA.isEnabledOnceMouseenter && MOUSE_EVENTS_DATA.onceMouseenter) {
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

  mouseEnter(callback: (evt?: IEngineDomMouseEvent) => void, params?: IMouseenterLeaveOptions): void {
    MOUSE_EVENTS_DATA.isEnabledOnceMouseenter = !!params?.oneObject;
    this.mouseEvent('mousemove', mouseenter(callback, this.object));
  }

  mouseLeave(callback: (evt?: IEngineDomMouseEvent) => void, params?: IMouseenterLeaveOptions): void {
    MOUSE_EVENTS_DATA.isEnabledOnceMouseleave = !!params?.oneObject;
    this.mouseEvent('mousemove', mouseleave(callback, this.object), false);
  }

  mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void, forEnter: boolean = true): void {
    const eventListenerCallback = (e: MouseEvent) => {
      const context = this.object.sys.context;
      const { mouseX, mouseY } = getRectCoords(e, context);

      if (this.isEntered(mouseX, mouseY) && forEnter) {
        callback({ event: e, mouseX, mouseY });
        this.object.isCursorEnter = true;
        if (MOUSE_EVENTS_DATA.isEnabledOnceMouseenter) {
          MOUSE_EVENTS_DATA.onceMouseenter = true;
        }
        MOUSE_EVENTS_DATA.onceMouseleave = false;
      }

      if (!this.isEntered(mouseX, mouseY) && !forEnter) {
        callback({ event: e, mouseX, mouseY });
        this.object.isCursorEnter = false;
        if (MOUSE_EVENTS_DATA.isEnabledOnceMouseenter) {
          MOUSE_EVENTS_DATA.onceMouseenter = false;
        }
        MOUSE_EVENTS_DATA.onceMouseleave = true;
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
    // console.log('isEntered', object.width, object.height, mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height);

    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }
}
