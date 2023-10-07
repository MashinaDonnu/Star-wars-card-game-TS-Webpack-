import { AbstractCard } from '@modules/game-obects/abstract-card';
import { EngineScene } from '@engine/scenes/engine-scene';

export class TestCard extends AbstractCard {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 196,
      height: 306,
      x: 0,
      y: 0,
      name: 'TestCard obj',
      spriteName: 'card',
    });
  }

  init() {}

  onDestroy() {
    console.log('TestCard onDestroy');
    setTimeout(() => {
      console.log(666666, this.events.mouse.domListeners);
    }, 2000);
  }
}
