import { Engine } from '@engine';
import { EngineSceneRenderer } from '@engine/scene-render/engine-scene-renderer';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { AbstractEngineSceneRenderer } from '@engine/scene-render/abstract-engine-scene-renderer';

export class SceneFadeRenderer extends AbstractEngineSceneRenderer {
  private readonly defaultVelocityOffset = 0.02;
  private readonly intervalValue = 10;

  constructor(protected readonly engine: Engine) {
    super(engine);
  }

  render(scene: EngineScene, options?: IEngineSceneRendererOptions) {
    switch (options.animation.type) {
      case EngineSceneRendererAnimations.FadeIn:
        this.fadeIn(scene, options);
        break;
      case EngineSceneRendererAnimations.FadeOutFadeIn:
        this.fadeOutFadeIn(scene, options);
        break;
    }
  }

  fadeIn(scene: EngineScene, options?: IEngineSceneRendererOptions) {
    const context = scene.sys.context;
    let alpha = 0;
    this.engine.disableEvents();
    const prevScene = this.engine.scenesHistory.prev();
    this.prerender(scene, { fade: { alpha: 0.1 } });
    const intervalId = setInterval(() => {
      this.clearRect();
      if (alpha >= 1) {
        prevScene.destroy();
        this.engine.enableEvents();
        this.finalizeRender(scene);
        clearInterval(intervalId);
      } else {
        alpha += options.animation?.velocity ?? this.defaultVelocityOffset;
        for (const [sprite, config] of scene.spritesMap) {
          if (context instanceof CanvasRenderingContext2D) {
            const image = scene.sprites.get(sprite);
            context.drawImage(image, config.x, config.y);
            context.globalAlpha = alpha;
          }
        }
      }
    }, this.intervalValue);
  }

  fadeOutFadeIn(scene: EngineScene, options?: IEngineSceneRendererOptions) {
    const context = scene.sys.context;
    const prevScene = this.engine.scenesHistory.prev();
    let alpha = 1;
    this.engine.disableEvents();
    const intervalId = setInterval(() => {
      this.clearRect();
      if (alpha <= 0) {
        this.fadeIn(scene, options);
        clearInterval(intervalId);
      } else {
        alpha -= options.animation?.velocity ?? this.defaultVelocityOffset;
        for (const [sprite, config] of prevScene.spritesMap) {
          if (context instanceof CanvasRenderingContext2D) {
            const image = prevScene.sprites.get(sprite);
            context.drawImage(image, config.x, config.y);
            context.globalAlpha = alpha;
          }
        }
      }
    }, this.intervalValue);
  }
}
