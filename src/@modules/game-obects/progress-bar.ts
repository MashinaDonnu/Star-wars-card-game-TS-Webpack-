import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { colors } from 'common/styles/colors';

export class ProgressBar extends Engine.Objects.Template {
  private progress = 0;
  constructor(scene: EngineScene) {
    super(scene, {
      width: 230,
      height: 30,
      x: 100,
      y: 290,
      fill: colors.progressBar,
      name: 'ProgressBar',
    });
  }

  init(): void {
    this.fillBar();
    this.layout.justify.center();
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
    this.clearRect({
      x: 100,
      y: 290,
      width: 230,
      height: 30,
    });
    this.render();
    this.scene.renderSceneTemplate('ProgressBar', {
      width: this.progress,
      height: 30,
      x: 100,
      y: 290,
      fill: colors.primary,
    });

    if (this.sys.elemsInLoading === 0) {
      const timeoutId = setTimeout(() => {
        this.sys.setCurrentScene('Test', {
          animation: {
            type: EngineSceneRendererAnimations.SlideTop,
            velocity: 1,
          },
        });

        clearTimeout(timeoutId);
      }, 1000);
    }
  }
}
