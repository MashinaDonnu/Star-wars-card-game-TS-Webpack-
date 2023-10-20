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
}
