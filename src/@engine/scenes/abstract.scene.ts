import { IAbstractScene } from '@engine/types/scene.interface';
import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoaders } from '@engine/engine-loaders';
import { EngineSprites } from '@engine/engine-sprites';

export abstract class AbstractScene implements IAbstractScene {
  emitter = new EventEmitter();
  readonly name: string;

  load: EngineLoaders;
  sprites: EngineSprites;
  sys: Engine;

  protected constructor(name: string) {
    this.name = name;
    this.load = Engine.load(name);
    this.sprites = Engine.sprites(name);
    this.sys = Engine.sys;
  }
  destroy(): void {}

  init(): void {}

  abstract preload(): void;

  abstract render(): void;

  abstract update(): void;
}
