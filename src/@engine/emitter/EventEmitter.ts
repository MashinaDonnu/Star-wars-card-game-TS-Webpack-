import { IAbstractEventEmitter } from '@engine/emitter/types/abstract-event-emitter.interface';
import { TAbstractEventEmitterRecord } from '@engine/emitter/types/event-record.type';

export class EventEmitter<T extends TAbstractEventEmitterRecord> implements IAbstractEventEmitter {
  protected listeners = new Map<keyof T, Set<Function>>();

  emit<E extends keyof T>(event: E, ...args: Parameters<T[E]>): void {
    const set = this.getSetOfCallbacks(event);
    set.forEach((callback) => {
      callback(...args);
    });
  }

  off(event?: keyof TAbstractEventEmitterRecord, callback?: (...args: unknown[]) => void): void {
    if (!event) {
      this.listeners.clear();
      return;
    }

    const set = this.getSetOfCallbacks(event);
    if (callback === null) {
      set.clear();
      return;
    }

    set.delete(callback);
  }

  on<E extends keyof T>(event: E, callback: T[E]): void {
    const set = this.getSetOfCallbacks(event);
    set.add(callback);
  }

  private getSetOfCallbacks(event: keyof T): Set<Function> {
    const set = this.listeners.get(event);
    return set === null ? new Set() : set;
  }
}
