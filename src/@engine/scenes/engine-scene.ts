import { EventEmitter } from '@engine/emitter/EventEmitter';
import { Engine } from '@engine';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite, ISpriteConfig } from '@engine/engine-sprite';
import { EngineObject } from '@engine/objects/engine-object';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { EngineAudio } from '@engine/engine-audio';
import { EngineTemplate } from '@engine/engine-template';
import { ITemplateObjectParams } from '@engine/objects/template-object';
import { EngineSceneDomEvent } from '@engine/dom-events/scene/engine-scene-dom-event';

export interface IEngineSceneOptions {
  imageLoadStrategy?: EngineImageLoaderStrategy;
}

export abstract class EngineScene {
  readonly name: string;
  emitter: EventEmitter;
  objects: EngineObject[] = [];
  imageLoadStrategy: EngineImageLoaderStrategy = EngineImageLoaderStrategy.Default;
  spritesMap = new Map<string, ISpriteConfig>();
  templatesMap = new Map<string, ITemplateObjectParams>();
  events: EngineSceneDomEvent;

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
    this.objects = [];
    this.spritesMap.clear();
    this.templatesMap.clear();
    this.destroyed = true;
  }

  abstract init(): void;

  preInit() {
    this.destroyed = false;
    this.emitter = new EventEmitter();
    this.events = new EngineSceneDomEvent(this);
  }

  registerObject(object: EngineObject): void {
    object.order = this.objects.length + 1;
    this.objects.push(object);
  }

  renderSceneSprite(name: string, config: ISpriteConfig): void {
    if (!this.spritesMap.has(name)) {
      console.log('renderSceneSprite exists', name);
      this.spritesMap.set(name, config);
    }
    this.sprites.render(name, config);
  }

  renderSceneTemplate(name: string, config: ITemplateObjectParams): void {
    if (!this.spritesMap.has(name)) {
      this.templatesMap.set(name, config);
    }
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
