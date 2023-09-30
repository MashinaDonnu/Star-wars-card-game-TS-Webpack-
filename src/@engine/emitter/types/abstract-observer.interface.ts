import { TAbstractEventEmitterRecord } from '@engine/emitter/types/event-record.type';

export interface IAbstractObserver<T extends TAbstractEventEmitterRecord = TAbstractEventEmitterRecord> {
  on<E extends keyof T>(event: E, callback: T[E]): void;
  off(event?: keyof T, callback?: (...args: any[]) => void): void;
}
