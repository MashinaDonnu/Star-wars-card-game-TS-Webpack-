import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { EngineScene } from '@engine/scenes/engine-scene';

export interface IEngineConfig {
  graphicEngine: EGraphicsEngine;
  width: number;
  height: number;
  scenes: EngineScene[];
}
