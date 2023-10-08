import { Engine } from '@engine/Engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { engineData } from '@engine/engine-data';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { ICoords } from '@engine/types/coords.interface';
import { ISpriteConfig } from '@engine/engine-sprite';
import { SceneSlideRenderer } from '@engine/scene-render/scene-slide-renderer';

const slideAnimations: EngineSceneRendererAnimations[] = [
  EngineSceneRendererAnimations.SlideTop,
  EngineSceneRendererAnimations.SlideRight,
  EngineSceneRendererAnimations.SlideBottom,
  EngineSceneRendererAnimations.SlideLeft,
];

export class EngineSceneRenderer {
  slideRenderer = new SceneSlideRenderer(this);

  constructor(public engine: Engine) {}

  render(scene: EngineScene, options?: IEngineSceneRendererOptions): void {
    if (options?.animation) {
      if (this.isSlide(options.animation)) {
        return this.slideRenderer.render(options.animation, scene);
      }
    }

    this.finalizeRender(scene);
  }

  prerender(scene: EngineScene, coords?: ICoords) {
    const sceneProxy = new Proxy(scene, {
      get(target: EngineScene, p: keyof EngineScene, receiver: any): any {
        if (p === 'renderSceneSprite' && typeof target[p] === 'function') {
          return function (name: string, config: ISpriteConfig) {
            config.x = coords.x || config.x;
            config.y = coords.y || config.y;

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

  private isSlide(animation: EngineSceneRendererAnimations): boolean {
    return slideAnimations.includes(animation);
  }
}
