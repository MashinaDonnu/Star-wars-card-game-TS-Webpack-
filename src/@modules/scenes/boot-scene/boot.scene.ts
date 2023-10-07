import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { TestCard2 } from '@modules/game-obects/test-card2';

export class BootScene extends Engine.Scene {
  card: TestCard2;
  constructor() {
    super('Boot', {
      imageLoadStrategy: EngineImageLoaderStrategy.Default,
    });
  }

  update() {}

  preload(): void {
    this.load.image('/images/star-wars-bg.jpeg', 'name');
    this.load.image('/images/card.png', 'card');
  }

  render(): void {
    console.log('BootScene render');
    this.renderSceneSprite('name', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });

    this.card = new TestCard2(this);
  }

  init() {
    this.card.events.mouse.mouseDown((data: any) => {
      console.log(11111);
      this.sys.setCurrentScene('Test');
      // this.destroy();
    });
    this.card.events.mouse.mouseUp((data: any) => {});
  }
}
