import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { TestCard2 } from '@modules/game-obects/test-card2';
import { ProgressBar } from '@modules/game-obects/progress-bar';

export class BootScene extends Engine.Scene {
  card: TestCard2;
  progressBar: ProgressBar;
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

    this.progressBar = new ProgressBar(this);
    const testScene = this.sys.getScene('Test');
    testScene.preload();
  }

  init() {
    console.log('BootScene init');
  }
}
