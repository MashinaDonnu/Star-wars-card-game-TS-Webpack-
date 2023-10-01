import { EngineMouseEvent } from '@engine/dom-events/engine-mouse-event';
import { EngineObject } from '@engine/objects/engine-object';
import { IEngineDomMouseEvent } from '@engine/engine-dom-events';

export class DragAndDropEvent extends EngineMouseEvent {
  isDragging = false;
  constructor(object: EngineObject) {
    super(object);
  }

  dragStart(callback: (evt?: IEngineDomMouseEvent) => void) {
    this.mouseDown((event) => {
      const { mouseY, mouseX } = event;
      if (this.isEntered(mouseX, mouseY)) {
        this.isDragging = true;
      }
    });
  }

  drag() {
    if (this.isDragging) {
      this.mouseMove((event) => {
        const { mouseY, mouseX } = event;
      });
    }
  }

  drop() {}
}
