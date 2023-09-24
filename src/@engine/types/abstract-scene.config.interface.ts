import { IEngine } from '@engine/types/engine.interface';

export interface ISceneConfig {
  engine: IEngine;
  store: any;
  eventEmitter: any;
}
