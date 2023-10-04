import { Engine } from '@engine/Engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { engineData } from '@engine/engine-data';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';

export class EngineSceneRenderer {
  constructor(private engine: Engine) {}

  render(scene: EngineScene, options?: IEngineSceneRendererOptions): void {
    console.log('OPTS:', options);
    if (options?.animation) {
      console.log('DAAAAA');
      switch (options.animation) {
        case EngineSceneRendererAnimations.Slide: {
          return this.slide(scene);
        }
      }
    }

    this.finalizeRender(scene);
  }

  protected finalizeRender(scene: EngineScene) {
    console.log('finalizeRender');
    Promise.all(engineData.loadersImagePromises).then(() => {
      scene.init();
      scene.render();
      scene.objects.forEach((obj) => {
        obj.render();
      });
      engineData.loadersImagePromises.clear();
    });
  }

  protected slide(scene: EngineScene): void {
    console.log('SLIDE');
    const context = scene.sys.context;
    let y: number;
    setInterval(() => {
      for (const [sprite, config] of scene.spritesMap) {
        if (context instanceof CanvasRenderingContext2D) {
          if (!y) {
            y = config.y;
          }
          context.clearRect(0, 0, 640, 360);
          const image = scene.sprites.get(sprite);
          y -= 2;
          context.drawImage(image, config.x, y - 2);
        }
      }
      // const img = this._currentScene.sprites.get('bg2');
      // if (context instanceof CanvasRenderingContext2D) {
      //   context.clearRect(0, 0, 640, 360);
      //   context.drawImage(img, 0, y);
      // }
    }, 50);
  }
}
