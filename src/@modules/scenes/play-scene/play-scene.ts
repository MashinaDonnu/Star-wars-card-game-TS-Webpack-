import { Engine } from '@engine';
import { HeroObject } from '@modules/scenes/play-scene/objects/hero.object';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';
import { HeroObject2 } from '@modules/scenes/play-scene/objects/hero.object2';

export class PlayScene extends Engine.Scene {
  cards: CardObject[] = [];
  constructor() {
    super('Play');
  }
  init(): void {
    const context = this.sys.context;
    const canvas = this.sys.context.canvas;
    const contextWidth = this.sys.config.width;
    const contextHeight = this.sys.config.height;
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;
      for (const card of this.cards) {
        if (card.isDragging) {
          card.x = mouseX - card.dragOffsetX;
          card.y = mouseY - card.dragOffsetY;
          if (context instanceof CanvasRenderingContext2D) {
            context.clearRect(0, 0, contextWidth, contextHeight);
          }
          // this.scene.render();
          this.render();
          this.objects.forEach((obj) => {
            obj.render();
          });
        }
      }
    });
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

    this.drawPlayersBlocks();
    this.cardPlaces();
    this.cardPlaces2();
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
    const blockHeight = 70;
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
    context.strokeStyle = 'red';
    context.stroke();
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
    const blockHeight = 80;
    const blockWidth = canvas.width * 0.12;
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

    new HeroObject2(this, {
      width: 50,
      height: 65,
      x: canvasWidth / 2 - blockWidth / 2 + 18,
      y: 30,
      spriteName: 'obiwan',
      name: 'Obi',
    });
  }

  cardPlaces() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 55;
    const blockWidth = canvas.width * 0.52;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 190;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    // context.fill();
    context.closePath();

    for (let i = 0; i < 2; i++) {
      const card = new CardObject(this, {
        x: offsetX + 55 * i + 4,
        y: offsetY,
        width: 40,
        height: 55,
        name: 'card' + i,
        spriteName: 'card',
      });

      this.cards.push(card);
    }
  }

  cardPlaces2() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 55;
    const blockWidth = canvas.width * 0.52;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 120;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    context.strokeStyle = 'red';
    // context.fill();
    context.closePath();

    // for (let i = 0; i < 2; i++) {
    //   const card = new CardObject(this, {
    //     x: offsetX + 55 * i + 2.6,
    //     y: offsetY,
    //     width: 40,
    //     height: 55,
    //     name: 'card1' + i,
    //     spriteName: 'card',
    //   });
    // }
  }

  update(): void {}
}
