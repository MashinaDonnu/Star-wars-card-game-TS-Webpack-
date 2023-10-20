import { AbstractEngineEvent } from '@engine/dom-events/abstract-engine-event';
import { IEngineDomMouseEvent } from '@engine/dom-events/types/engine-dom-mouse-event.interface';

export abstract class EngineMouseEvent extends AbstractEngineEvent {
  protected constructor() {
    super();
  }

  mouseDown(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousedown', callback);
  }

  mouseUp(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseup', callback);
  }

  mouseMove(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mousemove', callback);
  }

  mouseOver(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseover', callback);
  }

  mouseOut(callback: (evt?: IEngineDomMouseEvent) => void): void {
    this.mouseEvent('mouseout', callback);
  }

  abstract mouseEvent(mouseEvent: string, callback: (evt?: IEngineDomMouseEvent) => void, forEnter?: boolean): void;
}
