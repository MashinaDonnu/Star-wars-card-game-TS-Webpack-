import { EngineDomEvents } from '@engine/dom-events/engine-dom-events';
import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EventEmitter } from '@engine/emitter/EventEmitter';
import { IRect } from '@engine/types/rect';

export interface IAbstractObjectParams extends IRect {
  name?: string;
  spriteName?: string;
}

export abstract class EngineObject {
  width: number;
  height: number;
  x: number;
  y: number;
  events: EngineDomEvents;
  emitter: EventEmitter;
  sys: Engine;
  scene: EngineScene;
  name: string;
  spriteName: string;

  protected constructor(scene: EngineScene, params: IAbstractObjectParams) {
    const { width, height, x, y, name, spriteName } = params;
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.name = name;
    this.spriteName = spriteName;
    this.sys = Engine.sys;

    this.register();
  }

  abstract init(): void;

  abstract render(): void;

  onDestroy(): void {}

  destroy(): void {
    this.onDestroy();
    this.events.mouse.off();
    this.emitter.off();
  }

  preInit() {
    this.events = new EngineDomEvents(this);
    this.emitter = new EventEmitter();
  }

  private register(): void {
    console.log('register', this);
    this.scene.registerObject(this);
  }
}
