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
  emitter = new EventEmitter();
  readonly objects = new Set<EngineObject>();
  readonly imageLoadStrategy: EngineImageLoaderStrategy = EngineImageLoaderStrategy.Default;
  readonly spritesMap = new Map<string, ISpriteConfig>();

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
    this.objects.forEach((object) => object.destroy());
    this.objects.clear();
    this.spritesMap.clear();
  }

  init(): void {}

  registerObject(object: EngineObject): void {
    this.objects.add(object);
  }

  renderSceneSprite(name: string, config: ISpriteConfig) {
    this.spritesMap.set(name, config);
    this.sprites.render(name, config);
  }

  clone(): EngineScene {
    return JSON.parse(JSON.stringify(this));
  }

  abstract preload(): void;

  abstract render(): void;

  abstract update(): void;
}
