import { EngineScene } from '@engine/scenes/engine-scene';
import { Engine } from '@engine';

export interface IHeroesBlocksParams {
  topHeroBlockWidth: number;
  bottomHeroBlockWidth: number;
  topHeroBlockHeight: number;
  bottomHeroBlockHeight: number;
}

export class HeroesBlocks {
  private sys: Engine;
  constructor(
    private scene: EngineScene,
    private params: IHeroesBlocksParams
  ) {
    this.sys = scene.sys;

    this.drawCurrentPlayerBlock();
    this.drawOppositionPlayerBlock();
  }

  drawCurrentPlayerBlock() {
    console.log('drawCurrentPlayerBlock');
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = this.params.bottomHeroBlockHeight;
    // const blockWidth = canvas.width * 0.12;
    const blockWidth = this.params.bottomHeroBlockWidth;
    context.fillStyle = '#000';

    context.beginPath();
    context.moveTo(0, canvasHeight - blockHeight);
    context.lineTo(canvasWidth / 2 - blockWidth / 2, canvasHeight - blockHeight);
    // context.arc(canvasWidth / 2 + blockWidth / 2, canvasHeight - blockHeight, 75, 0, getRadians(180));
    context.quadraticCurveTo(canvasWidth / 2, canvasHeight - blockHeight - 80, canvasWidth / 2 + blockWidth / 2, canvasHeight - blockHeight);
    context.lineTo(canvasWidth, canvasHeight - blockHeight);
    context.lineTo(canvasWidth, canvasHeight);
    context.lineTo(0, canvasHeight);
    context.strokeStyle = 'red';
    context.stroke();
    context.fill();
    context.closePath();

    // new CardObject(this, {
    //   x: canvas.width - 55,
    //   y: canvasHeight - blockHeight - 80,
    //   width: 55,
    //   height: 70,
    //   name: 'card1',
    //   spriteName: 'card',
    // });
  }

  drawOppositionPlayerBlock() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = this.params.topHeroBlockHeight;
    // const blockWidth = canvas.width * 0.12;
    const blockWidth = this.params.topHeroBlockWidth;
    context.fillStyle = '#000';

    context.beginPath();
    context.moveTo(0, blockHeight);
    context.lineTo(canvasWidth / 2 - blockWidth / 2, blockHeight);
    context.quadraticCurveTo(canvasWidth / 2, blockHeight + 40, canvasWidth / 2 + blockWidth / 2, blockHeight);
    context.lineTo(canvasWidth, blockHeight);
    context.lineTo(canvasWidth, 0);
    context.lineTo(0, 0);
    context.strokeStyle = 'red';
    context.stroke();
    context.fill();
    context.closePath();
  }
}
