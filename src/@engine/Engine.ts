import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { IEngineConfig } from '@engine/types/engine-config.interface';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EngineLoader } from '@engine/engine-loader';
import { EngineSprite } from '@engine/engine-sprite';
import { engineData } from '@engine/engine-data';
import { EngineObjects } from '@engine/engine-objects';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { EngineSceneRenderer } from '@engine/engine-scene-renderer';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { EngineSceneHistory } from '@engine/engine-scene-history';

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

  scenesHistory = new EngineSceneHistory(this);
  private sceneRenderer = new EngineSceneRenderer(this);

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

  setCurrentScene(name: string, options?: IEngineSceneRendererOptions) {
    const scene = this.scenes.find((s) => s.name === name);
    const context = this.context;
    if (scene) {
      // this._currentScene?.destroy();
      // if (context instanceof CanvasRenderingContext2D) {
      //   context.clearRect(0, 0, 640, 360);
      // }
      this.scenesHistory.push(scene);
      this._currentScene = scene;
    }

    if (this._currentScene.imageLoadStrategy === EngineImageLoaderStrategy.Lazy) {
      this._currentScene.preload();
    }

    console.log('HISTORY: ', this.scenesHistory);
    for (const el of this.scenesHistory.queue.list.links()) {
      console.log('HISTORY ITEM: ', el.value);
    }
    // this.sceneRenderer.render(this._currentScene);

    const prev = this.scenesHistory.prev();
    console.log('PREV', prev);

    if (prev) {
      this.sceneRenderer.render(this._currentScene, {
        animation: EngineSceneRendererAnimations.Slide,
      });
    } else {
      this.sceneRenderer.render(this._currentScene);
    }
  }

  update(): void {
    this.scenes.forEach((scene) => {
      if (this._currentScene?.name === scene.name) {
        scene.update();
      }
    });
  }

  run() {
    this.initPlayground();

    if (this.onPreload && typeof this.onPreload === 'function') {
      this.onPreload();
    }
    if (this.onRender && typeof this.onRender === 'function') {
      this.onRender();
    }

    this.render();
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

  private render(): void {
    console.log('Render =>');
    this.scenes.forEach((scene) => {
      if (scene.imageLoadStrategy === EngineImageLoaderStrategy.Default) {
        scene.preload();
      }
    });

    this.setCurrentScene(this.scenes[0].name);
  }

  // private render(): void {
  //   console.log('RENDER: ', this._currentScene.name);
  //
  //
  //   // this.scenes.forEach((scene) => {
  //   //   if (scene.imageLoadStrategy === EngineImageLoaderStrategy.Default) {
  //   //     scene.preload();
  //   //   }
  //   //   const imageLoaders = engineData.loadersImagePromises;
  //   //   console.log('imageLoaders', engineData);
  //   //   Promise.all(imageLoaders).then(() => {
  //   //     if (this._currentScene.name === scene.name) {
  //   //       if (scene.imageLoadStrategy === EngineImageLoaderStrategy.Lazy) {
  //   //         scene.preload();
  //   //         Promise.all(imageLoaders).then(() => {
  //   //           scene.init();
  //   //           scene.render();
  //   //           scene.objects.forEach((obj) => {
  //   //             obj.render();
  //   //           });
  //   //         });
  //   //       } else {
  //   //         scene.init();
  //   //         scene.render();
  //   //         scene.objects.forEach((obj) => {
  //   //           obj.render();
  //   //         });
  //   //       }
  //   //     }
  //   //     engineData.loadersImagePromises.clear();
  //   //   });
  //   // });
  // }

  private renderScene(): void {
    Promise.all(engineData.loadersImagePromises).then(() => {
      this._currentScene.init();
      this._currentScene.render();
      this._currentScene.objects.forEach((obj) => {
        obj.render();
      });
      engineData.loadersImagePromises.clear();
    });
  }

  private requestAnimationFrame(callback: FrameRequestCallback): void {
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
