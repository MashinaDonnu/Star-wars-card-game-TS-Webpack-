import { Engine } from '@engine/engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';
import { SceneSlideRenderer } from '@engine/scene-render/scene-slide-renderer';
import { SceneFadeRenderer } from '@engine/scene-render/scene-fade-renderer';
import { fadeAnimations, slideAnimations } from '@engine/scene-render/animations';
import { TEngineSceneRendererAnimation } from '@engine/types/engine-scene-renderer-animation-types';
import { AbstractEngineSceneRenderer } from '@engine/scene-render/abstract-engine-scene-renderer';

export class EngineSceneRenderer extends AbstractEngineSceneRenderer {
  slideRenderer = new SceneSlideRenderer(this.engine);
  fadeRenderer = new SceneFadeRenderer(this.engine);

  constructor(protected engine: Engine) {
    super(engine);
  }

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

  private getAnimationType(animation: EngineSceneRendererAnimations): TEngineSceneRendererAnimation {
    if (slideAnimations.includes(animation)) {
      return 'slide';
    }
    if (fadeAnimations.includes(animation)) {
      return 'fade';
    }
  }

  private default(scene: EngineScene) {
    const prevScene = this.engine.scenesHistory.prev();
    this.clearRect();
    prevScene?.destroy();
    this.finalizeRender(scene);
  }
}
