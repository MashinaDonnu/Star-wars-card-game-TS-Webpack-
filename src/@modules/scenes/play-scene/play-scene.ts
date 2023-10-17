import { Engine } from '@engine';

function getRadians(degrees: number) {
  return (Math.PI / 180) * degrees;
}

export class PlayScene extends Engine.Scene {
  constructor() {
    super('Play');
  }
  init(): void {
    this.drawPlayersBlocks();
  }

  preload(): void {
    this.load.image('/images/playground-bg.png', 'playground-bg');
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
    const blockHeight = 75;
    const blockWidth = canvas.width * 0.12;

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
  }

  drawOppositionPlayerBlock() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 75;
    const blockWidth = canvas.width * 0.12;
    // context.fillStyle = '#000';
    console.log(canvasHeight - blockHeight);

    context.beginPath();
    context.moveTo(0, blockHeight);
    context.lineTo(canvasWidth / 2 - blockWidth / 2, blockHeight);
    context.quadraticCurveTo(canvasWidth / 2, blockHeight + 80, canvasWidth / 2 + blockWidth / 2, blockHeight);
    context.lineTo(canvasWidth, blockHeight);
    context.lineTo(canvasWidth, 0);
    context.lineTo(0, 0);
    // context.fill();
    context.fill();
    context.closePath();
  }

  update(): void {}
}
