import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { TestCard2 } from '@modules/game-obects/test-card2';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { ProgressBar } from '@modules/game-obects/progress-bar';

export class BootScene extends Engine.Scene {
  card: TestCard2;
  progressBar: any;
  constructor() {
    super('Boot', {
      imageLoadStrategy: EngineImageLoaderStrategy.Default,
    });
  }

  update() {}

  preload(): void {
    this.load.image('/images/boot-background.jpeg', 'boot-background');
  }

  render(): void {
    console.log('BootScene render');
    this.renderSceneSprite('boot-background', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  init() {
    console.log('init');
    this.loading();
  }

  loading() {
    const context = this.sys.context;
    const progress = new ProgressBar(this);

    progress.render();
    // context.fillStyle = 'rgb(200,0,0)';
    // context.fillRect(200, 290, 155, 50);
    // let val = 0;

    // setInterval(() => {
    //   context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    //
    //   context.fillRect(10, 10, val, 50);
    //   val++;
    // });
  }
}
