import { IEngineObject } from '@engine/types/engine-object.interface';
import { EngineDomEvents } from '@engine/engine-dom-events';
import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';

export interface IAbstractObjectParams {
  width: number;
  height: number;
  x: number;
  y: number;
}

export abstract class EngineObject implements IEngineObject {
  width: number;
  height: number;
  x: number;
  y: number;
  events = new EngineDomEvents(this);
  sys: Engine;
  scene: EngineScene;

  protected constructor(scene: EngineScene, params: IAbstractObjectParams) {
    const { width, height, x, y } = params;
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sys = Engine.sys;

    this.register();
  }

  abstract render(): void;

  private register(): void {
    this.scene.registerObject(this);
  }
}
