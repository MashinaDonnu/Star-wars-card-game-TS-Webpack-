import { IEngineObject } from '@engine/types/engine-object.interface';
import { EngineDomEvents } from '@engine/engine-dom-events';
import { Engine } from '@engine';
import { IScene } from '@engine/types/scene.interface';

export interface IAbstractObjectParams {
  width: number;
  height: number;
  x: number;
  y: number;
}

export abstract class AbstractObject implements IEngineObject {
  width: number;
  height: number;
  x: number;
  y: number;
  events = new EngineDomEvents(this);
  sys: Engine;
  scene: IScene;

  protected constructor(scene: IScene, params: IAbstractObjectParams) {
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
