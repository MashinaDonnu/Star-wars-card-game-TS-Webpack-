import { Engine } from '@engine';

export class PlayScene extends Engine.Scene {
  constructor() {
    super('Play');
  }
  init(): void {}

  preload(): void {
    this.load.image('/images/playground-bg.png', 'playground-bg');
  }

  render(): void {
    this.renderSceneSprite('playground-bg', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
