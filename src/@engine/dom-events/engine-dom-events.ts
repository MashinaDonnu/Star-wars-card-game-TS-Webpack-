import { EngineObject } from '@engine/objects/engine-object';
import { IAbstractObserver } from '@engine/emitter/types/abstract-observer.interface';
import { EngineMouseEvent } from '@engine/dom-events/engine-mouse-event';

export interface IEngineDomEvent {
  mouseX: number;
  mouseY: number;
}

export interface IEngineDomMouseEvent extends IEngineDomEvent {
  event: MouseEvent;
}

export class EngineDomEvents {
  mouse: EngineMouseEvent;

  constructor(private object: EngineObject) {
    this.mouse = new EngineMouseEvent(this.object);
  }
}
