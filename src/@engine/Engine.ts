import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { IEngine } from '@engine/types/engine.interface';
import { IEngineConfig } from '@engine/types/engine-config.interface';
import { IAbstractScene } from '@engine/types/scene.interface';

export class Engine implements IEngine {
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  scenes: IAbstractScene[] = [];
  onPreload: Function;
  onRender: Function;
  private _root$: HTMLElement;
  private _isDrawing: boolean = false;
  private _currentScene: IAbstractScene;

  constructor(public config: IEngineConfig) {
    this.scenes = config.scenes;
  }

  setScenes(scenes: IAbstractScene[]): void {
    this.scenes = scenes;
  }

  registerScene(scene: IAbstractScene): void {
    this.scenes.push(scene);
  }

  setCurrentScene(scene: IAbstractScene) {
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
      scene.render();
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
