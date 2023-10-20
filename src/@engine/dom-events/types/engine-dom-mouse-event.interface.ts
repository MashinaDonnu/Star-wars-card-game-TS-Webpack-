import { IEngineDomEvent } from '@engine/dom-events/types/engine-dom-event.interface';

export interface IEngineDomMouseEvent extends IEngineDomEvent {
  event: MouseEvent;
}
