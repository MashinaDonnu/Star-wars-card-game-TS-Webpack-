import { PlayScene } from '@modules/scenes/play-scene/play-scene';
import { getCanvasData } from 'common/utils/get-canvas-data';
import { CardPlaygroundCellObject } from '@modules/scenes/play-scene/objects/card-playground-cell.object';
import { CARD_HEIGHT, CARD_WIDTH } from '@modules/scenes/play-scene/const';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';

export class PlaygroundCards {
  private canvasData = getCanvasData(this.scene.sys);
  cardsWrapperWidth: number;
  topCells: CardPlaygroundCellObject[] = [];
  bottomCells: CardPlaygroundCellObject[] = [];

  constructor(private scene: PlayScene) {
    this.cardsWrapperWidth = this.canvasData.canvas.width * 0.52 - 50;
    this.initCells();
  }

  initCells() {
    this.initTopCells();
    this.initBottomCells();
    this.initBottomCards();
  }

  initTopCells(): void {
    const offsetX = this.scene.canvasWidth / 2 - this.cardsWrapperWidth / 2;
    const offsetY = 230;
    for (let i = 0; i < 7; i++) {
      const cardCell = new CardPlaygroundCellObject(this.scene, {
        x: offsetX + 90 * i + 4,
        y: offsetY,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        name: 'card-cell' + i,
        fill: '#fff',
      });
      this.topCells.push(cardCell);
    }
  }

  initBottomCells(): void {
    const offsetX = this.scene.canvasWidth / 2 - this.cardsWrapperWidth / 2;
    const offsetY = 360;
    for (let i = 0; i < 7; i++) {
      const cardCell = new CardPlaygroundCellObject(this.scene, {
        x: offsetX + 90 * i + 4,
        y: offsetY,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        name: 'card-cell' + i,
        fill: '#fff',
      });
      this.bottomCells.push(cardCell);
    }
  }

  initBottomCards(): void {
    const cardWidth = CARD_WIDTH + 30;
    const cardHeight = CARD_HEIGHT + 30;
    const offsetX = this.scene.canvasWidth / 2 - this.cardsWrapperWidth / 2;
    const offsetY = 580;
    const cardsCount = 10;
    const cardsWidth = cardsCount * cardWidth;
    // const intersection = cardsWidth * 0.05;
    const intersection = 0;
    let offset = 0;
    for (let i = 0; i < cardsCount; i++) {
      const card = new CardObject(
        this.scene,
        {
          // x: offsetX + this.cardsWrapperWidth / 2 - cardsWidth / 2 + i * 40,
          x: offsetX + this.cardsWrapperWidth / 2 - (cardsWidth - intersection * cardsCount) / 2 + offset,
          y: offsetY,
          width: cardWidth,
          height: cardHeight,
          name: 'card' + i,
          spriteName: 'card',
        },
        i + 1
      );

      card.zIndex = i + 1;

      offset += cardWidth - intersection + 10;

      this.scene.cards.push(card);
    }

    console.log(this.scene.objects);
  }
}
