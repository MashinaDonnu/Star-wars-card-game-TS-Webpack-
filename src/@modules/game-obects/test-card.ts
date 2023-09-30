import { AbstractCard } from '@modules/game-obects/abstract-card';
import { IScene } from '@engine/types/scene.interface';

export class TestCard extends AbstractCard {
  constructor(scene: IScene) {
    super(scene, {
      width: 196,
      height: 306,
      x: 0,
      y: 0,
      name: 'card',
    });
  }
}
