import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite, ISpriteConfig } from '@engine/engine-sprite';
import { EngineObject } from '@engine/objects/engine-object';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { EngineAudio } from '@engine/engine-audio';
import { EngineTemplate } from '@engine/engine-template';
import { ITemplateObjectParams } from '@engine/objects/template-object';

export interface IEngineSceneOptions {
  imageLoadStrategy?: EngineImageLoaderStrategy;
}

export abstract class EngineScene {
  readonly name: string;
  emitter: EventEmitter;
  objects = new Set<EngineObject>();
  imageLoadStrategy: EngineImageLoaderStrategy = EngineImageLoaderStrategy.Default;
  spritesMap = new Map<string, ISpriteConfig>();
  templatesMap = new Map<string, ITemplateObjectParams>();

  destroyed = false;
  disabled = false;
  load: EngineLoader;
  sprites: EngineSprite;
  templates: EngineTemplate;
  audio: EngineAudio;
  sys: Engine;

  protected constructor(name: string, options?: IEngineSceneOptions) {
    this.name = name;
    this.load = Engine.load(name);
    this.sprites = Engine.sprites(name);
    this.templates = Engine.template();
    this.audio = Engine.audio(name);
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
    this.templatesMap.clear();
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
    if (!this.spritesMap.has(name)) {
      console.log(111111);
      this.spritesMap.set(name, config);
    }
    this.sprites.render(name, config);
  }

  renderSceneTemplate(name: string, config: ITemplateObjectParams): void {
    this.templatesMap.set(name, config);
    this.templates.render(config);
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
