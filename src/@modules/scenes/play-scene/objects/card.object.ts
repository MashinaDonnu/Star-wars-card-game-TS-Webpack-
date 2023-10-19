import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { IAbstractObjectParams } from '@engine/objects/engine-object';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';

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
    });

    const context = this.sys.context;
    const contextWidth = this.sys.config.width;
    const contextHeight = this.sys.config.height;
    this.events.mouse.mouseMove(({ mouseX, mouseY }) => {
      console.log(111);
      if (this.isDragging) {
        this.x = mouseX - this.dragOffsetX;
        this.y = mouseY - this.dragOffsetY;
        if (context instanceof CanvasRenderingContext2D) {
          context.clearRect(0, 0, contextWidth, contextHeight);
        }

        this.render();
        // this.scene.render();
        // this.scene.objects.forEach((obj) => {
        //   obj.render();
        // });
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
