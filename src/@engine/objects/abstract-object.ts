import { IEngineObject } from '@engine/types/engine-object.interface';
import { EngineDomEvents } from '@engine/engine-dom-events';
import { Engine } from '@engine';

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
  protected constructor(params: IAbstractObjectParams) {
    const { width, height, x, y } = params;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}
