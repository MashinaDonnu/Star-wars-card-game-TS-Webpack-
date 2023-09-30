import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoaders } from '@engine/engine-loaders';
import { EngineSprites } from '@engine/engine-sprites';
import { IEngineObject } from '@engine/types/engine-object.interface';

export abstract class EngineScene {
  readonly name: string;
  emitter = new EventEmitter();
  readonly objects = new Set<IEngineObject>();

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

  registerObject(object: IEngineObject): void {
    this.objects.add(object);
  }

  abstract preload(): void;

  abstract render(): void;

  abstract update(): void;
}
