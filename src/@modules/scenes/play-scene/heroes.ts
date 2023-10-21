import { HeroObject } from '@modules/scenes/play-scene/objects/hero.object';
import { HeroObject2 } from '@modules/scenes/play-scene/objects/hero.object2';
import { PlayScene } from '@modules/scenes/play-scene/play-scene';
import { EngineObject } from '@engine/objects/engine-object';

export class Heroes {
  canvas: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;

  topHero: EngineObject;
  bottomHero: EngineObject;
  constructor(private scene: PlayScene) {
    const context = scene.sys.context;
    this.canvas = context.canvas;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.initTopHero();
    this.initBottomHero();
  }

  initTopHero(): void {
    this.topHero = new HeroObject2(this.scene, {
      width: 60,
      height: 75,
      x: this.canvasWidth / 2 - this.scene.topHeroBlockWidth / 2 + 50,
      y: 135,
      spriteName: 'obiwan',
      name: 'Obi',
    });
  }

  initBottomHero(): void {
    this.bottomHero = new HeroObject(this.scene, {
      width: 70,
      height: 80,
      x: this.canvasWidth / 2 - this.scene.bottomHeroBlockWidth / 2 + 45,
      y: this.canvasHeight - this.scene.bottomHeroBlockHeight - 30,
      spriteName: 'vader',
      name: 'Vader',
    });
  }
}
