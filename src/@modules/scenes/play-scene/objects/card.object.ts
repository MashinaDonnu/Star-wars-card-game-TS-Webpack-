import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IAbstractObjectParams } from '@engine/objects/engine-object';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';
import { SpriteObject } from '@engine/objects/sprite-object';
import { CardPlaygroundCellObject } from '@modules/scenes/play-scene/objects/card-playground-cell.object';
import { PlayScene } from '@modules/scenes/play-scene';

export class CardObject extends Engine.Objects.Sprite {
  dragOffsetX: number;
  dragOffsetY: number;
  isDragging: boolean;
  constructor(
    public playScene: PlayScene,
    public params: IAbstractObjectParams
  ) {
    super(playScene, params);
  }

  init() {
    console.log('CardObject init');
    this.events.mouse.mouseDown(({ mouseX, mouseY }) => {
      this.isDragging = true;
      this.zIndex++;
      this.playScene.objects = this.playScene.objects.sort((a, b) => a.zIndex - b.zIndex);
      this.dragOffsetX = mouseX - this.x;
      this.dragOffsetY = mouseY - this.y;
      this.sys.sceneRenderer.rerender(this.playScene);
      if (!this.playScene.draggingCard) {
        this.playScene.draggingCard = this;
      }
    });

    this.events.mouse.mouseUp(({ mouseX, mouseY }) => {
      this.isDragging = false;
      this.zIndex = 0;
      this.playScene.draggingCard = null;
      // this.playScene.objects = this.playScene.objects.sort((a, b) => a.order - b.order);
      for (const obj of this.playScene.objects) {
        if (obj instanceof CardPlaygroundCellObject && obj.name !== this.name) {
          if (this.isEnterOnObject(obj)) {
            this.x = obj.x;
            this.y = obj.y;
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
