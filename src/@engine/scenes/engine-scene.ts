import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite, ISpriteConfig } from '@engine/engine-sprite';
import { EngineObject } from '@engine/objects/engine-object';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';

export interface IEngineSceneOptions {
  imageLoadStrategy?: EngineImageLoaderStrategy;
}

export abstract class EngineScene {
  readonly name: string;
  emitter: EventEmitter;
  objects = new Set<EngineObject>();
  imageLoadStrategy: EngineImageLoaderStrategy = EngineImageLoaderStrategy.Default;
  spritesMap = new Map<string, ISpriteConfig>();

  destroyed = false;
  disabled = false;
  load: EngineLoader;
  sprites: EngineSprite;
  sys: Engine;

  protected constructor(name: string, options?: IEngineSceneOptions) {
    this.name = name;
    this.load = Engine.load(name);
    this.sprites = Engine.sprites(name);
    this.sys = Engine.sys;

    if (options) {
      if (options.imageLoadStrategy) {
        this.imageLoadStrategy = options.imageLoadStrategy;
      }
    }
  }

  destroy(): void {
    console.log('this.objects', this.objects);
    this.objects.forEach((object) => object.destroy());
    this.objects.clear();
    this.spritesMap.clear();
    this.destroyed = true;
  }

  abstract init(): void;

  preInit() {
    this.destroyed = false;
    this.emitter = new EventEmitter();
    // this.objects = new Set<EngineObject>();
    // this.spritesMap = new Map<string, ISpriteConfig>();
  }

  registerObject(object: EngineObject): void {
    this.objects.add(object);
  }

  renderSceneSprite(name: string, config: ISpriteConfig): void {
    this.spritesMap.set(name, config);
    this.sprites.render(name, config);
  }

  removeEvents(): void {
    this.objects.forEach((object) => {
      object.events.mouse.off();
    });
  }

  disable(): void {
    this.disabled = true;
  }

  enable(): void {
    this.disabled = false;
  }

  clone(): EngineScene {
    return JSON.parse(JSON.stringify(this));
  }

  abstract preload(): void;

  abstract render(): void;

  // abstract create(): void;

  abstract update(): void;
}
