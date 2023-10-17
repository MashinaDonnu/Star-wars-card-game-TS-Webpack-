import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';

export class PreviewScene extends Engine.Scene {
  constructor() {
    super('Preview', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }
  init(): void {
    const timeoutId = setTimeout(() => {
      this.sys.setCurrentScene('Boot');
      clearTimeout(timeoutId);
    }, 3000);
  }

  preload(): void {
    this.load.image('/images/preview.jpeg', 'preview');
  }

  render(): void {
    this.renderSceneSprite('preview', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
