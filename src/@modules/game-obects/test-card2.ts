import { AbstractCard } from '@modules/game-obects/abstract-card';
import { EngineScene } from '@engine/scenes/engine-scene';

export class TestCard2 extends AbstractCard {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 196,
      height: 306,
      x: 100,
      y: 10,
      name: 'TestCard2 obj',
      spriteName: 'card',
    });
  }

  init() {}

  onDestroy() {}
}
