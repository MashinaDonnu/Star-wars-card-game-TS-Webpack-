import { Engine } from '@engine';
import { PlayScene } from '@modules/scenes/play-scene';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';

export interface IAttackArrowData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const defaultAttackArrowData = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};

export class AttackArrowObject extends Engine.Objects.Template {
  data: IAttackArrowData = defaultAttackArrowData;

  isDrawing = false;
  constructor(scene: PlayScene) {
    super(scene, {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  }

  start(event: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.sys.context.canvas.getBoundingClientRect();
    this.data.startX = event.clientX - rect.left;
    this.data.startY = event.clientY - rect.top;
    this.data.endX = event.clientX - rect.left;
    this.data.endY = event.clientY - rect.top;
  }

  draw(event: MouseEvent): void {
    if (this.isDrawing) {
      const rect = this.sys.context.canvas.getBoundingClientRect();
      this.data.endX = event.clientX - rect.left;
      this.data.endY = event.clientY - rect.top;
      const context = this.sys.context;
      const contextWidth = this.sys.config.width;
      const contextHeight = this.sys.config.height;
      this.sys.sceneRenderer.rerender(this.scene);
      this.render();
    }
  }

  attack(event: MouseEvent): void {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.data = defaultAttackArrowData;

      this.sys.sceneRenderer.clearRect();
      this.sys.sceneRenderer.rerender(this.scene);
    }
  }

  render() {
    if (this.isDrawing) {
      this.drawArrow();
    }
  }

  protected drawArrow() {
    const context = this.sys.context;
    const { startX, startY, endX, endY } = this.data;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = 'blue';
    context.lineWidth = 2;
    context.stroke();
  }
}
