import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { MenuObject } from '@modules/scenes/main-menu-scene/objects/menu.object';

export class MainMenuScene extends Engine.Scene {
  private menu: MenuObject;
  constructor() {
    super('MainMenu', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }
  init(): void {
    this.menu = new MenuObject(this);
  }

  preload(): void {
    this.load.image('/images/main-menu-bg.webp', 'main-menu-bg');
  }

  render(): void {
    console.log(7777777, 'MainMenuScene');
    this.renderSceneSprite('main-menu-bg', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
