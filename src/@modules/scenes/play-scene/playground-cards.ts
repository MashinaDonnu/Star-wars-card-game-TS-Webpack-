import { PlayScene } from '@modules/scenes/play-scene/play-scene';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';
import { getCanvasData } from 'common/utils/get-canvas-data';

export class PlaygroundCards {
  private canvasData = getCanvasData(this.scene.sys);
  cardsWrapperHeight = 55;
  cardsWrapperWidth: number;

  constructor(private scene: PlayScene) {
    this.cardsWrapperWidth = this.canvasData.canvas.width * 0.52;
    this.initWrappers();
    this.initCards();
  }

  initCards() {
    const offsetX = this.scene.canvasWidth / 2 - this.cardsWrapperWidth / 2;
    const offsetY = 100;
    for (let i = 0; i < 7; i++) {
      const card = new CardObject(this.scene, {
        x: offsetX + 55 * i + 4,
        y: offsetY,
        width: 40,
        height: 55,
        name: 'card' + i,
        spriteName: 'card',
      });

      this.scene.cards.push(card);
    }
  }

  initCardsDragAndDrop() {}

  initTopCardWrapper() {
    const { canvas, context, canvasWidth, canvasHeight } = this.canvasData;
    const blockHeight = this.cardsWrapperHeight;
    const blockWidth = this.cardsWrapperWidth;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 100;
    context.fillStyle = '#000';
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    context.fill();
    context.closePath();
  }

  initWrappers(): void {
    this.initTopCardWrapper();
    this.initBottomCardWrapper();
  }

  initBottomCardWrapper() {
    const { canvas, context, canvasWidth, canvasHeight } = this.canvasData;
    const blockHeight = this.cardsWrapperHeight;
    const blockWidth = this.cardsWrapperWidth;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 170;

    context.fillStyle = '#000';
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    // context.strokeStyle = 'red';
    context.fill();
    context.closePath();
  }
}
