import { IEngine, ISceneConfig } from '@engine';
import { IScene } from '@engine/types/scene.interface';

export interface IGameConfig {
  store: any;
  engine: IEngine;
  scenes: (new (...args: any[]) => IScene)[];
}
