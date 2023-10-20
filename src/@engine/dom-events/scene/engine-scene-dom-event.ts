import { EngineObject } from '@engine/objects/engine-object';
import { EngineObjectMouseEvent } from '@engine/dom-events/object/engine-object-mouse-event';
import { EngineSceneMouseEvent } from '@engine/dom-events/scene/engine-scene-mouse-event';
import { EngineScene } from '@engine/scenes/engine-scene';

export class EngineSceneDomEvent {
  mouse: EngineSceneMouseEvent;

  constructor(private scene: EngineScene) {
    this.mouse = new EngineSceneMouseEvent(this.scene);
  }
}
