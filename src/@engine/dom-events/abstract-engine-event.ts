import { IAbstractObserver } from '@engine/emitter/types/abstract-observer.interface';
import { TEngineContext } from '@engine';
import { EngineObject } from '@engine/objects/engine-object';

export abstract class AbstractEngineEvent implements IAbstractObserver {
  domListeners = new Map<string, Set<EventListenerOrEventListenerObject>>();

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
      listeners.forEach((callback) => {
        document.removeEventListener(key, callback);
      });

      listeners.clear();
    });
  }

  calculateCoords(context: TEngineContext, object: EngineObject): { x: number; y: number } {
    if (context instanceof CanvasRenderingContext2D) {
      const { widthPercent, heightPercent } = this.getSizePercent(context);
      return {
        x: object.x + (object.x * widthPercent) / 100,
        y: object.y + (object.y * heightPercent) / 100,
      };
    }
  }

  calculateSize(context: TEngineContext, object: EngineObject): { width: number; height: number } {
    if (context instanceof CanvasRenderingContext2D) {
      const { widthPercent, heightPercent } = this.getSizePercent(context);
      return {
        width: object.width + (object.width * widthPercent) / 100,
        height: object.height + (object.height * heightPercent) / 100,
      };
    }
  }

  private getSizePercent(context: TEngineContext): { widthPercent: number; heightPercent: number } {
    if (context instanceof CanvasRenderingContext2D) {
      const canvas = context.canvas;
      const originalWidth = canvas.width;
      const currentWidth = canvas.clientWidth;

      const originalHeight = canvas.height;
      const currentHeight = canvas.clientHeight;

      return {
        widthPercent: ((currentWidth - originalWidth) / originalWidth) * 100,
        heightPercent: ((currentHeight - originalHeight) / originalHeight) * 100,
      };
    }
  }
}
