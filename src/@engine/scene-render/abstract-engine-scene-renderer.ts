import { EngineScene } from '@engine/scenes/engine-scene';
import { IPrerenderParams } from '@engine/scene-render/types';
import { ISpriteConfig } from '@engine/engine-sprite';
import { engineData } from '@engine/engine-data';
import { Engine } from '@engine';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';

export abstract class AbstractEngineSceneRenderer {
  protected constructor(protected readonly engine: Engine) {}

  protected prerender(scene: EngineScene, params?: IPrerenderParams) {
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

  protected finalizeRender(scene: EngineScene) {
    const promises = [...engineData.loadersImagePromises, ...engineData.loadersAudioPromises];
    Promise.all(
      promises.map((p) => {
        return p.then((data) => {
          console.log('DATA:', data);
        });
      })
    )
      .then(() => {
        console.log('THEN');
      })
      .then(() => {
        scene.render();
        scene.preInit();
        scene.objects.forEach((obj) => {
          obj.render();
          obj.preInit();
          obj.init();
        });
        scene.init();
        engineData.loadersImagePromises.clear();
        engineData.loadersAudioPromises.clear();
      })
      .catch((error) => {
        console.log('finalizeRender error', error);
      });
  }

  protected clearRect(): void {
    const context = this.engine.context;
    const contextWidth = this.engine.config.width;
    const contextHeight = this.engine.config.height;
    if (context instanceof CanvasRenderingContext2D) {
      context.clearRect(0, 0, contextWidth, contextHeight);
    }
  }

  abstract render(scene: EngineScene, options?: IEngineSceneRendererOptions): void;
}
