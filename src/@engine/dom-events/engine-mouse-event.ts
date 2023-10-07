import { EngineObject } from '@engine/objects/engine-object';
import { IEngineDomMouseEvent } from '@engine/engine-dom-events';
import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';
import { Engine } from '@engine';

function disableIfDisabledFunction(fn: Function, engine: Engine) {
  return function (...args: any[]) {
    if (engine.disabledEvents) {
      console.log('Функция недоступна, так как disabled === true');
      return; // Если disabled === true, то не вызывать функцию
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

        const f = this.isEntered(mouseX, mouseY);
        console.log('BOOL:', f);
        if (f) {
          callback({ event: e, mouseX, mouseY });
        }
      }
    };

    console.log('this.object.scene.disabled', this.object.sys.disabledEvents, this.object.scene.name, this.object.name);
    if (!this.object.sys.disabledEvents) {
      this.on(mouseEvent, disableIfDisabledFunction(eventListenerCallback, this.object.sys));
    }
  }

  protected isEntered(mouseX: number, mouseY: number): boolean {
    const object = this.object;
    return mouseX >= object.x && mouseX <= object.x + object.width && mouseY >= object.y && mouseY <= object.y + object.height;
  }
}
