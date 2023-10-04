import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { engineData } from '@engine/engine-data';

export class TestScene extends Engine.Scene {
  constructor() {
    super('Test', {
      imageLoadStrategy: EngineImageLoaderStrategy.Default,
    });
  }

  preload(): void {
    this.load.image('/images/star-wars-bg-2.jpeg', 'bg2');
    this.load.image('/images/card.png', 'card');
  }

  render(): void {
    this.renderSceneSprite('bg2', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
    const card = new TestCard(this);
    card.events.mouse.mouseDown((data) => {
      this.sys.setCurrentScene('Boot');
      console.log('data: ', data);
    });
    setTimeout(() => {
      // console.log('7777', this);
      // console.log(engineData);
    }, 2000);
    console.log('TestScene render');
  }

  update(): void {}
}
