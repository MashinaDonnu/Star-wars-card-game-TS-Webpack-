import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { MenuObject } from '@modules/scenes/main-menu-scene/objects/menu.object';

export class MainMenuScene extends Engine.Scene {
  private menu: MenuObject;
  themeAudio: HTMLAudioElement;
  constructor() {
    super('MainMenu', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }
  init(): void {
    this.themeAudio = this.audio.get('menu-theme');
    console.log('Volume', this.themeAudio.volume);
    this.themeAudio.volume = 0.3;
    // this.themeAudio.play();
    this.menu = new MenuObject(this);
  }

  preload(): void {
    this.load.image('/images/main-menu-bg.webp', 'main-menu-bg');
    this.load.audio('/audio/menu-hover.mp3', 'menu-hover-audio');
    this.load.audio('/audio/main-menu-theme.mp3', 'menu-theme');
    this.load.audio('/audio/menu-select.mp3', 'menu-select-audio');
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
