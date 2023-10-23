import { Engine } from '@engine';
import { IAbstractObjectParams } from '@engine/objects/engine-object';
import { CardPlaygroundCellObject } from '@modules/scenes/play-scene/objects/card-playground-cell.object';
import { PlayScene } from '@modules/scenes/play-scene';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';
import { IRect } from '@engine/types/rect';
import { PlaygroundCards } from '@modules/scenes/play-scene/playground-cards';

let isCardHovered = false;
let isDragging = false;

export class CardObject extends Engine.Objects.Sprite {
  dragOffsetX: number;
  dragOffsetY: number;
  isDragging: boolean;
  originalRect: IRect;
  originalZInddex: number;
  constructor(
    public playScene: PlayScene,
    public params: IAbstractObjectParams,
    zIndex: number
  ) {
    super(playScene, params);
    this.zIndex = zIndex;
    this.originalRect = {
      x: params.x,
      y: params.y,
      width: params.width,
      height: params.height,
    };
  }

  init() {
    console.log('CardObject init');

    this.events.mouse.mouseEnter(
      () => {
        console.log('mouseEnter');

        if (!isCardHovered && !isDragging) {
          isCardHovered = true;
          this.playScene.cards = this.playScene.cards.map((el) => {
            el.y = el.originalRect.y;
            el.x = el.originalRect.x;
            el.width = el.originalRect.width;
            el.height = el.originalRect.height;
            el.zIndex = 0;
            return el;
          });
          toggleCursorType('pointer');
          this.zIndex += 100;
          this.y -= 100;
          this.width += 100;
          this.height += 100;
          this.playScene.objects = this.playScene.objects.sort((a, b) => a.zIndex - b.zIndex);

          // this.render();
          this.sys.sceneRenderer.clearRect();
          this.sys.sceneRenderer.rerender(this.scene);
          isCardHovered = true;
        }
      },
      { oneObject: true }
    );

    this.events.mouse.mouseLeave(
      () => {
        console.log('mouseLeave');
        if (isCardHovered && !isDragging) {
          isCardHovered = false;
          toggleCursorType('default');
          this.zIndex -= 100;
          this.y = this.originalRect.y;
          this.x = this.originalRect.x;
          this.width = this.originalRect.width;
          this.height = this.originalRect.height;
          this.playScene.objects = this.playScene.objects.sort((a, b) => a.zIndex - b.zIndex);
          this.sys.sceneRenderer.clearRect();
          this.sys.sceneRenderer.rerender(this.scene);
          // this.test.initBottomCards();
        }
      },
      { oneObject: true }
    );

    this.events.mouse.mouseDown(({ mouseX, mouseY }) => {
      isCardHovered = false;
      isDragging = true;
      this.isDragging = true;
      this.zIndex++;
      this.playScene.objects = this.playScene.objects.sort((a, b) => a.zIndex - b.zIndex);

      // this.x = mouseX + this.width / 2;
      this.width = this.originalRect.width;
      this.height = this.originalRect.height;
      this.y = mouseY - this.height / 2;

      this.dragOffsetX = mouseX - this.x;
      this.dragOffsetY = mouseY - this.y;
      this.sys.sceneRenderer.rerender(this.playScene);
      if (!this.playScene.draggingCard) {
        this.playScene.draggingCard = this;
      }
    });

    this.events.mouse.mouseUp(({ mouseX, mouseY }) => {
      isDragging = false;
      this.isDragging = false;
      this.zIndex--;
      this.playScene.draggingCard = null;
      // this.playScene.objects = this.playScene.objects.sort((a, b) => a.order - b.order);
      for (const obj of this.playScene.objects) {
        if (obj instanceof CardPlaygroundCellObject && obj.name !== this.name) {
          if (this.isEnterOnObject(obj)) {
            this.x = obj.x;
            this.y = obj.y;
            this.width = obj.width;
            this.height = obj.height;
            // this.zIndex = 0;
            this.sys.sceneRenderer.rerender(this.playScene);
          }
        }
      }
    });

    // this.events.mouse.mouseEnter(() => {
    //   console.log(this.params.name);
    //   toggleCursorType('pointer');
    // });
    //
    // this.events.mouse.mouseLeave(() => {
    //   console.log(this.params.name);
    //   toggleCursorType('default');
    // });
  }
}
