import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';

export interface IEngineSceneRendererOptions {
  animation?: {
    type: EngineSceneRendererAnimations;
    velocity?: number;
  };
}
