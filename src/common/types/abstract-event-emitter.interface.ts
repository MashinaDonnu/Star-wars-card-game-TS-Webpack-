import { IAbstractObserver } from 'common/types/abstract-observer.interface';
import { TAbstractEventEmitterRecord } from 'common/types/event-record.type';

export interface IAbstractEventEmitter<T extends TAbstractEventEmitterRecord = TAbstractEventEmitterRecord> extends IAbstractObserver {
  emit<E extends keyof T>(event: E, ...args: Parameters<T[E]>): void;
}
