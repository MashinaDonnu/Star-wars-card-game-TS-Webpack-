import { AbstractCard } from '@modules/game-obects/abstract-card';
import { EngineScene } from '@engine/scenes/engine-scene';

export class TestCard extends AbstractCard {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 196,
      height: 306,
      x: 200,
      y: 50,
      name: 'TestCard obj',
      spriteName: 'card',
    });
  }

  init() {}

  onDestroy() {}
}
