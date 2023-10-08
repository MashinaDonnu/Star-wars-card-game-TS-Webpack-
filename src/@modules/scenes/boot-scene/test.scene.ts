import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';

export class TestScene extends Engine.Scene {
  card: TestCard;
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
    console.log('TestScene render');
    this.renderSceneSprite('bg2', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
    this.card = new TestCard(this);

    setTimeout(() => {
      // console.log('7777', this);
      // console.log(engineData);
    }, 2000);
  }

  update(): void {}

  init() {
    this.card.events.mouse.mouseDown((data) => {
      console.log(2222222);
      // if (f) {
      this.sys.setCurrentScene('Boot', {
        animation: {
          type: EngineSceneRendererAnimations.SlideLeft,
          velocity: 10,
        },
      });
      console.log('data: ', data);
      // f = false;
      // }
    });
  }
}
