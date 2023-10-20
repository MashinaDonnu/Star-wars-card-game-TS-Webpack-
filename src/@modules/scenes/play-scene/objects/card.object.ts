import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IAbstractObjectParams } from '@engine/objects/engine-object';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';
import { SpriteObject } from '@engine/objects/sprite-object';
import { CardPlaygroundCellObject } from '@modules/scenes/play-scene/objects/card-playground-cell.object';

export class CardObject extends Engine.Objects.Sprite {
  dragOffsetX: number;
  dragOffsetY: number;
  isDragging: boolean;
  constructor(
    scene: EngineScene,
    public params: IAbstractObjectParams
  ) {
    super(scene, params);
  }

  init() {
    console.log('CardObject init');
    this.events.mouse.mouseDown(({ mouseX, mouseY }) => {
      this.isDragging = true;
      this.dragOffsetX = mouseX - this.x;
      this.dragOffsetY = mouseY - this.y;
    });

    this.events.mouse.mouseUp(({ mouseX, mouseY }) => {
      this.isDragging = false;
      for (const obj of this.scene.objects) {
        if (obj instanceof CardPlaygroundCellObject && obj.name !== this.name) {
          if (this.isEnterOnObject(obj)) {
            this.x = obj.x;
            this.y = obj.y;
            this.sys.sceneRenderer.rerender(this.scene);
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
