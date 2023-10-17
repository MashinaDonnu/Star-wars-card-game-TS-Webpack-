import { Engine } from '@engine';
import { HeroObject } from '@modules/scenes/play-scene/objects/hero.object';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';
import { HeroObject2 } from '@modules/scenes/play-scene/objects/hero.object2';

export class PlayScene extends Engine.Scene {
  constructor() {
    super('Play');
  }
  init(): void {
    this.drawPlayersBlocks();
  }

  preload(): void {
    this.load.image('/images/playground-bg.png', 'playground-bg');
    this.load.image('/images/vader2.png', 'vader');
    this.load.image('/images/obiwan.png', 'obiwan');
    this.load.image('/images/card.png', 'card');
    // const context = this.sys.context;
    //
    // const canvas = context.canvas;
    //
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
  }

  render(): void {
    this.renderSceneSprite('playground-bg', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  drawPlayersBlocks() {
    this.drawCurrentPlayerBlock();
    this.drawOppositionPlayerBlock();
  }

  drawCurrentPlayerBlock() {
    console.log('drawCurrentPlayerBlock');
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 95;
    const blockWidth = canvas.width * 0.12;
    context.fillStyle = '#000';

    context.beginPath();
    context.moveTo(0, canvasHeight - blockHeight);
    context.lineTo(canvasWidth / 2 - blockWidth / 2, canvasHeight - blockHeight);
    // context.arc(canvasWidth / 2 + blockWidth / 2, canvasHeight - blockHeight, 75, 0, getRadians(180));
    context.quadraticCurveTo(canvasWidth / 2, canvasHeight - blockHeight - 80, canvasWidth / 2 + blockWidth / 2, canvasHeight - blockHeight);
    context.lineTo(canvasWidth, canvasHeight - blockHeight);
    context.lineTo(canvasWidth, canvasHeight);
    context.lineTo(0, canvasHeight);
    context.fill();
    context.closePath();

    new HeroObject(this, {
      width: 70,
      height: 80,
      x: canvasWidth / 2 - blockWidth / 2 + 15,
      y: canvasHeight - blockHeight - 30,
      spriteName: 'vader',
      name: 'Vader',
    });

    new CardObject(this, {
      x: canvas.width - 55,
      y: canvasHeight - blockHeight - 100,
      width: 55,
      height: 70,
      name: 'card1',
      spriteName: 'card',
    });
  }

  drawOppositionPlayerBlock() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 95;
    const blockWidth = canvas.width * 0.12;
    context.fillStyle = '#000';
    console.log(canvasHeight - blockHeight);

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

    new HeroObject2(this, {
      width: 50,
      height: 65,
      x: canvasWidth / 2 - blockWidth / 2 + 18,
      y: 40,
      spriteName: 'obiwan',
      name: 'Obi',
    });
  }

  update(): void {}
}
