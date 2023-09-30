import { IEngine, ISceneConfig } from '@engine';
import { IAbstractScene } from '@engine/types/scene.interface';

export interface IGameConfig {
  store: any;
  engine: IEngine;
  scenes: (new (...args: any[]) => IAbstractScene)[];
}
