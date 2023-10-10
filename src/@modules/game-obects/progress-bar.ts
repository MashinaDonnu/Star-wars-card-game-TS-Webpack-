import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';

export class ProgressBar extends Engine.Objects.Template {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 230,
      height: 30,
      x: 100,
      y: 290,
      fill: 'rgb(200,0,0)',
    });
  }
}
