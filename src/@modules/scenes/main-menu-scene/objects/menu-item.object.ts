import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { ITemplateObjectParams, TemplateObject } from '@engine/objects/template-object';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';

export class MenuItemObject extends Engine.Objects.Template {
  private menuHoverAudio: HTMLAudioElement;
  constructor(
    scene: EngineScene,
    private parent: TemplateObject,
    private text: string,
    private config: ITemplateObjectParams
  ) {
    super(scene, config);
  }

  init() {
    this.menuHoverAudio = this.scene.audio.get('menu-hover-audio');
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
      toggleCursorType('default');
      this.menuHoverAudio.pause();
      this.menuHoverAudio.currentTime = 0;
    });

    this.events.mouse.mouseEnter((data) => {
      toggleCursorType('pointer');
      this.menuHoverAudio.play();
    });

    this.events.mouse.mouseDown(() => {
      console.log('Down');
    });
  }
}
