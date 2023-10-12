import { Engine } from '@engine';
import { EngineImageLoaderStrategy } from '@engine/enums/engine-image-loader-strategy.enum';
import { ProgressBarObject } from '@modules/game-obects/progress-bar.object';
import { IRect } from '@engine/types/rect';
import { colors } from 'common/styles/colors';
import { EngineScene } from '@engine/scenes/engine-scene';

export class BootScene extends Engine.Scene {
  progressBar: ProgressBarObject;
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

    this.initProgressbar();
    this.preloadScenes();
  }

  init() {
    console.log('BootScene init');
  }

  private preloadScenes() {
    const scenes: EngineScene[] = [this.sys.getScene('MainMenu')];

    scenes.forEach((scene) => scene.preload());
  }

  private initProgressbar() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const currentWidth = canvas.width;
    console.log('X', currentWidth / 2 - 290 / 2);
    const progressbarRect: IRect = {
      width: 290,
      height: 30,
      x: currentWidth / 2 - 290 / 2,
      y: 290,
    };
    this.progressBar = new ProgressBarObject(this, progressbarRect);
  }
}
