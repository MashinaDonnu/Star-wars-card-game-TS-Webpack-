import { EngineLoaders } from '@engine/engine-loaders';
import { EngineSprites } from '@engine/engine-sprites';
import { Engine } from '@engine';
import { IEngineObject } from '@engine/types/engine-object.interface';

export interface IScene {
  name: string;
  load: EngineLoaders;
  sprites: EngineSprites;
  sys: Engine;
  objects: Set<IEngineObject>;
  init(): void;
  preload(): void;
  render(): void;
  update(): void;
  registerObject(object: IEngineObject): void;
  destroy(): void;
}
