import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { IEngineConfig } from '@engine/types/engine-config.interface';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite } from '@engine/engine-sprite';
import { engineData } from '@engine/engine-data';
import { EngineObjects } from '@engine/engine-objects';

export type TEngineContext = CanvasRenderingContext2D | WebGLRenderingContext;

export class Engine {
  context: TEngineContext;
  scenes: EngineScene[] = [];
  onPreload: Function;
  onRender: Function;
  private _root$: HTMLElement;
  private _isDrawing: boolean = false;
  private _currentScene: EngineScene;

  static Scene = EngineScene;
  static sys: Engine;
  static load: (namespace: string) => EngineLoader;
  static sprites: (namespace: string) => EngineSprite;
  static Objects = EngineObjects;

  constructor(public config: IEngineConfig) {
    this.scenes = config.scenes;
    Engine.load = (namespace: string) => new EngineLoader(namespace, this);
    Engine.sprites = (namespace: string) => new EngineSprite(namespace, this);
    Engine.sys = this;
  }

  setScenes(scenes: EngineScene[]): void {
    this.scenes = [...this.scenes, ...scenes];
  }

  registerScene(scene: EngineScene): void {
    this.scenes.push(scene);
  }

  setCurrentScene(scene: EngineScene) {
    this._currentScene = scene;
  }

  update(): void {
    this.scenes.forEach((scene) => {
      scene.update();
    });
  }

  run() {
    this.initPlayground();
    this.preload();
    this.render();
    this.scenes.forEach((scene) => {
      scene.init();
      scene.preload();
      const imageLoaders = engineData.loadersImagePromises.get(scene.name);
      Promise.all(imageLoaders ?? []).then(() => {
        scene.render();
        scene.objects.forEach((obj) => {
          obj.render();
        });
      });
    });

    this.start();
    this.draw();
  }

  draw(): void {
    if (this._isDrawing) {
      this.requestAnimationFrame(() => {
        this.update();
        this.draw();
      });
    }
  }

  start(): void {
    this._isDrawing = true;
  }

  stop(): void {
    this._isDrawing = false;
  }

  private preload(): void {
    if (this.onPreload && typeof this.onPreload === 'function') {
      this.onPreload();
    }
  }

  private render(): void {
    if (this.onRender && typeof this.onRender === 'function') {
      this.onRender();
    }
  }

  private requestAnimationFrame(callback: FrameRequestCallback) {
    window.requestAnimationFrame(callback);
  }

  private initPlayground(): void {
    if (this._root$) {
      return;
    }
    this._root$ = document.createElement('div');
    document.body.append(this._root$);

    switch (this.config.graphicEngine) {
      case EGraphicsEngine.Canvas: {
        this.initCanvas();
      }
    }
  }

  private initCanvas(): void {
    const { width, height } = this.config;
    const canvasElement = document.createElement('canvas');
    canvasElement.width = width;
    canvasElement.height = height;

    this.context = canvasElement.getContext('2d');
    this._root$.append(canvasElement);
  }
}
