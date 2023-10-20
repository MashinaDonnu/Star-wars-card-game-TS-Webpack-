import { PlayScene } from '@modules/scenes/play-scene/play-scene';
import { getCanvasData } from 'common/utils/get-canvas-data';
import { CardPlaygroundCellObject } from '@modules/scenes/play-scene/objects/card-playground-cell.object';
import { CARD_HEIGHT, CARD_WIDTH } from '@modules/scenes/play-scene/const';

export class PlaygroundCards {
  private canvasData = getCanvasData(this.scene.sys);
  cardsWrapperWidth: number;
  topCells: CardPlaygroundCellObject[] = [];
  bottomCells: CardPlaygroundCellObject[] = [];

  constructor(private scene: PlayScene) {
    this.cardsWrapperWidth = this.canvasData.canvas.width * 0.52;
    this.initCells();
  }

  initCells() {
    this.initTopCells();
    this.initBottomCells();
  }

  initTopCells(): void {
    const offsetX = this.scene.canvasWidth / 2 - this.cardsWrapperWidth / 2;
    const offsetY = 100;
    for (let i = 0; i < 7; i++) {
      const cardCell = new CardPlaygroundCellObject(this.scene, {
        x: offsetX + 55 * i + 4,
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
    const offsetY = 170;
    for (let i = 0; i < 7; i++) {
      const cardCell = new CardPlaygroundCellObject(this.scene, {
        x: offsetX + 55 * i + 4,
        y: offsetY,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        name: 'card-cell' + i,
        fill: '#fff',
      });
      this.bottomCells.push(cardCell);
    }
  }
}
