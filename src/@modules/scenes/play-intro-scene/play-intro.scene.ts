import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';

export class PlayIntroScene extends Engine.Scene {
  constructor() {
    super('PlayIntro', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }

  init(): void {
    setTimeout(() => {
      this.sys.setCurrentScene('Play', {
        animation: {
          type: EngineSceneRendererAnimations.SlideBottom,
          velocity: 2,
        },
      });
    }, 2000);
  }

  preload(): void {
    this.load.image('/images/play-preview.jpeg', 'play-preview');
  }

  render(): void {
    this.renderSceneSprite('play-preview', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
