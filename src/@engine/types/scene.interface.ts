import { EngineLoaders } from '@engine/engine-loaders';
import { EngineSprites } from '@engine/engine-sprites';
import { Engine } from '@engine';

export interface IAbstractScene {
  name: string;
  load: EngineLoaders;
  sprites: EngineSprites;
  sys: Engine;
  init(): void;
  preload(): void;
  render(): void;
  update(): void;
  destroy(): void;
}
