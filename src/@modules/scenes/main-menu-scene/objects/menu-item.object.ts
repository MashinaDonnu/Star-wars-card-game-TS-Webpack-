import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { ITemplateObjectParams, TemplateObject } from '@engine/objects/template-object';

export class MenuItemObject extends Engine.Objects.Template {
  constructor(
    scene: EngineScene,
    private parent: TemplateObject,
    private text: string,
    private config: ITemplateObjectParams
  ) {
    super(scene, config);
  }

  init() {
    const { x, y } = this.layout.justify.center(this.parent);
    const textWidth = this.sys.context.measureText(this.text);
    this.setText({
      color: 'red',
      font: 'Arial',
      size: 16,
      text: this.text,
      x: this.config.x + this.config.width / 2 - textWidth.width / 2,
      y: this.config.y + this.config.height / 2 + 8 / 2,
    });

    this.events.mouse.mouseLeave((data) => {
      console.log('Leave', this.name);
    });

    this.events.mouse.mouseEnter((data) => {
      console.log('Enter', this.name);
    });

    this.events.mouse.mouseDown(() => {
      console.log('Down');
    });
  }
}
