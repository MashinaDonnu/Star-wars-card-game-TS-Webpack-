import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';

export class TestScene extends Engine.Scene {
  constructor() {
    super('Test', {
      imageLoadStrategy: EngineImageLoaderStrategy.Lazy,
    });
  }

  preload(): void {
    this.load.image('/images/star-wars-bg-2.jpeg', 'bg2');
    this.load.image('/images/card.png', 'card');
    console.log('TestScene preload');
  }

  render(): void {
    this.sprites.render('bg2', {
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
    console.log('TestScene render');
  }

  update(): void {}
}
