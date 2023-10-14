import { EngineDomEvents } from '@engine/dom-events/engine-dom-events';
import { Engine, TEngineContext } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EventEmitter } from '@engine/emitter/EventEmitter';
import { IRect } from '@engine/types/rect';
import { ObjectLayout } from '@engine/layout/object-layout';
import { IText } from '@engine/types/text.interface';

export interface IAbstractObjectParams extends IRect {
  name?: string;
  spriteName?: string;
}

export abstract class EngineObject {
  width: number;
  height: number;
  x: number;
  y: number;
  events: EngineDomEvents;
  emitter: EventEmitter;
  sys: Engine;
  scene: EngineScene;
  name: string;
  spriteName: string;
  layout = new ObjectLayout(this);
  isCursorEnter = false;

  protected constructor(scene: EngineScene, params: IAbstractObjectParams) {
    const { width, height, x, y, name, spriteName } = params;
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.name = name;
    this.spriteName = spriteName;
    this.sys = Engine.sys;

    this.register();
  }

  abstract init(): void;

  abstract render(): void;

  onDestroy(): void {}

  destroy(): void {
    this.onDestroy();
    this.events.mouse.off();
    this.emitter.off();
  }

  preInit() {
    this.events = new EngineDomEvents(this);
    this.emitter = new EventEmitter();
  }

  getSize(): { width: number; height: number } {
    const context = this.sys.context;
    if (context instanceof CanvasRenderingContext2D) {
      const { widthPercent, heightPercent } = this.getSizePercent();
      return {
        width: this.width + (this.width * widthPercent) / 100,
        height: this.height + (this.height * heightPercent) / 100,
      };
    }
  }

  getCoords(): { x: number; y: number } {
    const context = this.sys.context;
    if (context instanceof CanvasRenderingContext2D) {
      const { widthPercent, heightPercent } = this.getSizePercent();
      return {
        x: this.x + (this.x * widthPercent) / 100,
        y: this.y + (this.y * heightPercent) / 100,
      };
    }
  }

  private getSizePercent(): { widthPercent: number; heightPercent: number } {
    const context = this.sys.context;
    if (context instanceof CanvasRenderingContext2D) {
      const canvas = context.canvas;
      const originalWidth = canvas.width;
      const currentWidth = canvas.clientWidth;

      const originalHeight = canvas.height;
      const currentHeight = canvas.clientHeight;

      return {
        widthPercent: ((currentWidth - originalWidth) / originalWidth) * 100,
        heightPercent: ((currentHeight - originalHeight) / originalHeight) * 100,
      };
    }
  }

  protected setText(config: IText): void {
    const context = this.sys.context;
    const { font, size = 16, color, text, x, y } = config;
    if (context instanceof CanvasRenderingContext2D) {
      context.font = `$${size}px ${font}`;
      context.fillStyle = '#000';
      context.imageSmoothingQuality = 'high';
      console.log('TEXT', x, y);
      context.fillText(text, x, y);
    }
  }

  private register(): void {
    console.log('register', this);
    this.scene.registerObject(this);
  }
}
