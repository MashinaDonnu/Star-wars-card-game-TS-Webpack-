import { Engine } from '@engine/Engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { engineData } from '@engine/engine-data';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { ICoords } from '@engine/types/coords.interface';
import { ISpriteConfig } from '@engine/engine-sprite';
import { SceneSlideRenderer } from '@engine/scene-render/scene-slide-renderer';
import { SceneFadeRenderer } from '@engine/scene-render/scene-fade-renderer';
import { fadeAnimations, slideAnimations } from '@engine/scene-render/animations';
import { TEngineSceneRendererAnimation } from '@engine/types/engine-scene-renderer-animation-types';

export interface IPrerenderParams {
  fade?: {
    alpha?: number;
  };
  coords?: ICoords;
}

export class EngineSceneRenderer {
  slideRenderer = new SceneSlideRenderer(this);
  fadeRenderer = new SceneFadeRenderer(this);

  constructor(public engine: Engine) {}

  render(scene: EngineScene, options?: IEngineSceneRendererOptions): void {
    if (options?.animation) {
      switch (this.getAnimationType(options.animation.type)) {
        case 'slide':
          return this.slideRenderer.render(scene, options);
        case 'fade':
          return this.fadeRenderer.render(scene, options);
      }
    }

    this.default(scene);
  }

  prerender(scene: EngineScene, params?: IPrerenderParams) {
    const sceneProxy = new Proxy(scene, {
      get(target: EngineScene, p: keyof EngineScene): unknown {
        if (p === 'renderSceneSprite' && typeof target[p] === 'function') {
          return function (name: string, config: ISpriteConfig) {
            if (params?.coords) {
              config.x = params.coords.x ?? config.x;
              config.y = params.coords.y ?? config.y;
            }

            if (params?.fade) {
              config.alpha = params.fade.alpha ?? config.alpha;
            }

            return target[p].apply(target, [name, config]);
          };
        }

        return target[p];
      },
    });

    Promise.all(engineData.loadersImagePromises).then(() => {
      sceneProxy.render();
      sceneProxy.objects.forEach((obj) => {
        obj.render();
      });
    });
  }

  finalizeRender(scene: EngineScene) {
    Promise.all(engineData.loadersImagePromises).then(() => {
      scene.render();
      scene.preInit();
      scene.objects.forEach((obj) => {
        obj.render();
        obj.preInit();
        obj.init();
      });
      scene.init();
      engineData.loadersImagePromises.clear();
    });
  }

  private getAnimationType(animation: EngineSceneRendererAnimations): TEngineSceneRendererAnimation {
    if (slideAnimations.includes(animation)) {
      return 'slide';
    }
    if (fadeAnimations.includes(animation)) {
      return 'fade';
    }
  }

  private default(scene: EngineScene) {
    const context = this.engine.context;
    const contextWidth = this.engine.config.width;
    const contextHeight = this.engine.config.height;
    const prevScene = this.engine.scenesHistory.prev();
    if (context instanceof CanvasRenderingContext2D) {
      context.clearRect(0, 0, contextWidth, contextHeight);
    }
    prevScene?.destroy();
    this.finalizeRender(scene);
  }

  clearRect(): void {
    const context = this.engine.context;
    const contextWidth = this.engine.config.width;
    const contextHeight = this.engine.config.height;
    if (context instanceof CanvasRenderingContext2D) {
      context.clearRect(0, 0, contextWidth, contextHeight);
    }
  }
}
