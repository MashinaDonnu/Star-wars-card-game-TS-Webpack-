import { Engine } from '@engine/Engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { engineData } from '@engine/engine-data';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { ICoords } from '@engine/types/coords.interface';
import { ISpriteConfig } from '@engine/engine-sprite';

export class EngineSceneRenderer {
  constructor(private engine: Engine) {}

  render(scene: EngineScene, options?: IEngineSceneRendererOptions): void {
    if (options?.animation) {
      switch (options.animation) {
        case EngineSceneRendererAnimations.Slide: {
          return this.slide(scene);
        }
      }
    }

    this.finalizeRender(scene);
  }

  protected prerender(scene: EngineScene, coords?: ICoords) {
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

  protected finalizeRender(scene: EngineScene) {
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

  protected slide(scene: EngineScene): void {
    console.log('SLIDE', scene);
    const context = scene.sys.context;
    let complete1 = false;
    let complete2 = false;
    let y: number = 0;
    let y2: number = 360;

    const prev = this.engine.scenesHistory.prev();
    console.log('SLIDE PREV', prev);

    this.prerender(scene, {
      y: 360,
    });
    // this.finalizeRender(scene);
    this.engine.disabledEvents = true;
    console.log('iS DISABLED', prev.disabled);
    const intervalId = setInterval(() => {
      if (context instanceof CanvasRenderingContext2D) {
        context.clearRect(0, 0, 640, 360);
      }

      if (!complete1) {
        if (y <= -360) {
          for (const object of prev.objects) {
            // object.y = y;
          }
          for (const [sprite, config] of prev.spritesMap) {
            const image = prev.sprites.get(sprite);

            if (context instanceof CanvasRenderingContext2D) {
              context.drawImage(image, config.x, y);
            }
          }
          console.log('VSO1');
          // this.finalizeRender(scene);

          complete1 = true;
        } else {
          for (const [sprite, config] of prev.spritesMap) {
            y -= 10;
            const image = prev.sprites.get(sprite);
            if (context instanceof CanvasRenderingContext2D) {
              context.drawImage(image, config.x, y);
            }
          }
        }
      }

      if (!complete2) {
        if (y2 <= 0) {
          for (const [sprite, config] of scene.spritesMap) {
            const image = scene.sprites.get(sprite);

            if (context instanceof CanvasRenderingContext2D) {
              context.drawImage(image, config.x, y2);
            }
          }
          console.log('VSO2');
          complete2 = true;
          this.finalizeRender(scene);
          clearInterval(intervalId);
          prev.destroy();
          this.engine.disabledEvents = false;
        } else {
          for (const [sprite, config] of scene.spritesMap) {
            y2 -= 10;
            const image = scene.sprites.get(sprite);
            if (context instanceof CanvasRenderingContext2D) {
              context.drawImage(image, config.x, y2);
            }
          }
        }
      }
    }, 50);
  }
}
