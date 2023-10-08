import { AbstractCard } from '@modules/game-obects/abstract-card';
import { EngineScene } from '@engine/scenes/engine-scene';

export class TestCard2 extends AbstractCard {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 196,
      height: 306,
      x: 0,
      y: 0,
      name: 'TestCard2 obj',
      spriteName: 'card',
    });
  }

  init() {}

  onDestroy() {
    console.log('TestCard2 onDestroy');
    setTimeout(() => {
      console.log(55555, this.events.mouse.domListeners);
    }, 2000);
  }
}
