import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { IScene } from '@engine/types/scene.interface';

export interface IEngineConfig {
  graphicEngine: EGraphicsEngine;
  width: number;
  height: number;
  scenes: IScene[];
}
