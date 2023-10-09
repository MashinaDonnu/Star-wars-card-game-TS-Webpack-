import { ICoords } from '@engine/types/coords.interface';
import { TEngineContext } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { ISpriteConfig } from '@engine/engine-sprite';

export interface IPrerenderParams {
  fade?: {
    alpha?: number;
  };
  coords?: ICoords;
}

export interface ISlideParams {
  context: TEngineContext;
  contextWidth: number;
  contextHeight: number;
  prevScene: EngineScene;
}

export interface IDrawSceneSpritesParams {
  context: TEngineContext;
  scene: EngineScene;
  name: string;
  config: ISpriteConfig;
  coordValue: number;
  coord: 'x' | 'y';
}
