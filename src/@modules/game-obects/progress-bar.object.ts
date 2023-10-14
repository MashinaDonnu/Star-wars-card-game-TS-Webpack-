import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { colors } from 'common/styles/colors';
import { IRect } from '@engine/types/rect';

export class ProgressBarObject extends Engine.Objects.Template {
  private progress = 0;
  constructor(
    scene: EngineScene,
    private rect: IRect
  ) {
    super(scene, {
      ...rect,
      fill: colors.progressBar,
      name: 'ProgressBarObject',
    });
  }

  init(): void {
    this.fillBar();
  }

  fillBar(): void {
    const step = 230 / (this.sys.elemsInLoading + 1);
    this.progress += step;
    this.partialFillBar();
    this.sys.emitter.on('load', () => {
      this.progress += step;
      this.partialFillBar();
    });
  }

  private partialFillBar() {
    this.clearRect(this.rect);
    this.render();
    this.scene.renderSceneTemplate('ProgressBarObject', {
      ...this.rect,
      width: this.progress,
      fill: colors.primary,
    });

    if (this.sys.elemsInLoading === 0) {
      const timeoutId = setTimeout(() => {
        this.sys.setCurrentScene('MainMenu', {
          animation: {
            type: EngineSceneRendererAnimations.SlideBottom,
            velocity: 1,
          },
        });

        clearTimeout(timeoutId);
      }, 1000);
    }
  }

  onDestroy() {
    super.onDestroy();
    console.log('ProgressBarObject destroy');
  }
}
