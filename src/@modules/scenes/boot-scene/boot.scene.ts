import { Engine } from '@engine';
import { TestCard } from '@modules/game-obects/test-card';

export class BootScene extends Engine.Scene {
  constructor() {
    console.log('BOOOT');
    super('Boot');
  }

  update() {}

  preload(): void {
    this.load.image('/images/star-wars-bg.png', 'name');
    this.load.image('/images/card.png', 'card');
    console.log('scene preload');
  }

  render(): void {
    this.sprites.render('name', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });

    const card = new TestCard(this);
    card.events.mouseDown((data) => {
      console.log('data: ', data);
    });
    console.log('scene render', this.sprites.get('card'));
  }
}
