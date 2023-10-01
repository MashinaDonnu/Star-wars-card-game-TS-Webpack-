import { EngineObject } from '@engine/objects/engine-object';
import { IAbstractObserver } from '@engine/emitter/types/abstract-observer.interface';

export interface IEngineDomEvent {
  mouseX: number;
  mouseY: number;
}

export interface IEngineDomMouseEvent extends IEngineDomEvent {
  event: MouseEvent;
}

export class EngineDomEvents implements IAbstractObserver {
  domListeners = new Map<string, Set<EventListenerOrEventListenerObject>>();

  constructor(private object: EngineObject) {}

  mouseDown(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousedown', callback);
  }

  mouseUp(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mouseup', callback);
  }

  mouseMove(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseEvent('mousemove', callback);
  }

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    if (!this.domListeners.has(eventName)) {
      this.domListeners.set(eventName, new Set());
    }
    const listeners = this.domListeners.get(eventName);
    listeners.add(callback);

    document.addEventListener(eventName, callback);
  }

  off(eventName?: string, callback?: EventListenerOrEventListenerObject): void {
    if (eventName && callback) {
      const listeners = this.domListeners.get(eventName);
      if (listeners.size) {
        listeners.forEach((callback) => {
          document.removeEventListener(eventName, callback);
        });

        listeners.clear();
      }

      return;
    }

    this.domListeners.forEach((listeners, key) => {
      console.log(listeners);
      listeners.forEach((callback) => {
        document.removeEventListener(key, callback);
      });

      listeners.clear();
    });
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
