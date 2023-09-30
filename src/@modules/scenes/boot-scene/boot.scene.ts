import { Engine } from '@engine';

export class BootScene extends Engine.Scene {
  constructor() {
    console.log('BOOOT');
    super('Boot');
  }

  update() {}

  preload(): void {
    this.load.image('/images/star-wars-bg.png', 'name');
    console.log('scene preload');
  }

  render(): void {
    this.sprites.set('name', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
    console.log('scene render', this.sprites.get('name'));
  }
}
