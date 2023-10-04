import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';

export class BootScene extends Engine.Scene {
  constructor() {
    super('Boot', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }

  update() {}

  preload(): void {
    this.load.image('/images/star-wars-bg.png', 'name');
    this.load.image('/images/card.png', 'card');
  }

  render(): void {
    this.renderSceneSprite('name', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });

    const card = new TestCard(this);
    card.events.mouse.mouseDown((data) => {
      this.sys.setCurrentScene('Test');
    });
    card.events.mouse.mouseUp((data) => {});
  }
}
