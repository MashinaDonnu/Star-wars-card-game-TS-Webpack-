import { Engine } from '@engine';
import { IEngineDomMouseEvent } from '@engine/dom-events/types/engine-dom-mouse-event.interface';
import { EngineMouseEvent } from '@engine/dom-events/engine-mouse-event';
import { getRectCoords } from '@engine/utils/helpers/get-rect-coords';
import { EngineScene } from '@engine/scenes/engine-scene';

function isDisabled(fn: Function, engine: Engine) {
  return function (...args: any[]) {
    if (engine.disabledEvents) {
      return;
    }

    return fn(...args);
  };
}

export class EngineSceneMouseEvent extends EngineMouseEvent {
  scene: EngineScene;
  constructor(scene: EngineScene) {
    super();
    this.scene = scene;
  }

  mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void): void {
    const eventListenerCallback = (e: MouseEvent) => {
      const context = this.scene.sys.context;
      const { mouseX, mouseY } = getRectCoords(e, context);
      callback({ mouseX, mouseY, event: e });
    };

    if (!this.scene.sys.disabledEvents) {
      this.on(mouseEvent, isDisabled(eventListenerCallback, this.scene.sys));
    }
  }
}
