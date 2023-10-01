import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite } from '@engine/engine-sprite';
import { EngineObject } from '@engine/objects/engine-object';

export abstract class EngineScene {
  readonly name: string;
  emitter = new EventEmitter();
  readonly objects = new Set<EngineObject>();

  load: EngineLoader;
  sprites: EngineSprite;
  sys: Engine;

  protected constructor(name: string) {
    this.name = name;
    this.load = Engine.load(name);
    this.sprites = Engine.sprites(name);
    this.sys = Engine.sys;
  }
  destroy(): void {
    console.log('destroy', this.name);
    const context = this.sys.context;
    this.objects.forEach((object) => {
      object.destroy();
    });
    this.objects.clear();
  }

  init(): void {}

  registerObject(object: EngineObject): void {
    this.objects.add(object);
  }

  abstract preload(): void;

  abstract render(): void;

  abstract update(): void;
}
