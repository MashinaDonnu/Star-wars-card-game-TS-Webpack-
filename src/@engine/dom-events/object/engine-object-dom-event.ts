import { EngineObject } from '@engine/objects/engine-object';
import { EngineObjectMouseEvent } from '@engine/dom-events/object/engine-object-mouse-event';

export class EngineObjectDomEvent {
  mouse: EngineObjectMouseEvent;

  constructor(private object: EngineObject) {
    this.mouse = new EngineObjectMouseEvent(this.object);
  }
}
