import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { ITemplateObjectParams, TemplateObject } from '@engine/objects/template-object';
import { toggleCursorType } from 'common/utils/toggle-cursor-type';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';

export class MenuItemObject extends Engine.Objects.Template {
  private menuHoverAudio: HTMLAudioElement;
  private menuSelectAudio: HTMLAudioElement;
  constructor(
    scene: EngineScene,
    private text: string,
    private config: ITemplateObjectParams
  ) {
    super(scene, config);
  }

  init() {
    this.menuHoverAudio = this.scene.audio.get('menu-hover-audio');
    this.menuSelectAudio = this.scene.audio.get('menu-select-audio');
    this.initText();

    this.events.mouse.mouseEnter((data) => {
      toggleCursorType('pointer');
      this.params.fill = '#16214d';
      this.render();
      this.initText();
      this.menuHoverAudio.play().catch(console.log);
    });

    this.events.mouse.mouseLeave((data) => {
      toggleCursorType('default');
      this.menuHoverAudio.pause();
      this.menuHoverAudio.currentTime = 0;
      this.params.fill = '#23378c';
      this.render();
      this.initText();
    });

    this.events.mouse.mouseDown(() => {
      console.log('Down');
      this.menuSelectAudio.play();
      if (this.text === 'Play') {
        this.sys.setCurrentScene('PlayLoading', {
          animation: {
            type: EngineSceneRendererAnimations.SlideBottom,
            velocity: 7,
          },
        });
      }
      // this.sys.setCurrentScene('Settings', {
      //   animation: {
      //     type: EngineSceneRendererAnimations.SlideLeft,
      //   },
      // });
    });

    // this.sys.sceneRenderer.rerender(this.scene);
  }

  private initText() {
    console.log('TEXT:', this.text);
    const textWidth = this.sys.context.measureText(this.text.trim());

    this.setText({
      color: '#fff',
      font: 'Arial',
      size: 24,
      text: this.text.trim(),
      x: Math.ceil(this.config.x + this.config.width / 2 - textWidth.width / 2),
      y: Math.ceil(this.config.y + this.config.height / 2 + 16 / 2),
    });
  }
}
