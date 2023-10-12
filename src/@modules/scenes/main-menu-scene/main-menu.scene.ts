import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';

export class MainMenuScene extends Engine.Scene {
  constructor() {
    super('MainMenu', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }
  init(): void {}

  preload(): void {
    this.load.image('/images/main-menu-bg.webp', 'main-menu-bg');
  }

  render(): void {
    this.renderSceneSprite('main-menu-bg', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
