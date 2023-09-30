import { Engine, ISceneConfig } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';

export interface IGameConfig {
  store: any;
  engine: Engine;
  scenes: (new (...args: any[]) => EngineScene)[];
}
