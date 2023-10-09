import { EngineSceneRenderer } from '@engine/scene-render/engine-scene-renderer';
import { EngineScene } from '@engine/scenes/engine-scene';
import { Engine, TEngineContext } from '@engine';
import { EngineSceneRendererAnimations } from '@engine/enums/engine-scene-renderer-animations';
import { ISpriteConfig } from '@engine/engine-sprite';
import { IEngineSceneRendererOptions } from '@engine/types/engine-scene-renderer-options.interface';

interface ISlideParams {
  context: TEngineContext;
  contextWidth: number;
  contextHeight: number;
  prevScene: EngineScene;
}

interface IDrawSceneSpritesParams {
  context: TEngineContext;
  scene: EngineScene;
  name: string;
  config: ISpriteConfig;
  coordValue: number;
  coord: 'x' | 'y';
}

export class SceneSlideRenderer {
  engine: Engine;
  private readonly defaultVelocityOffset = 10;

  constructor(public engineSceneRenderer: EngineSceneRenderer) {
    this.engine = engineSceneRenderer.engine;
  }

  render(scene: EngineScene, options: IEngineSceneRendererOptions) {
    switch (options.animation.type) {
      case EngineSceneRendererAnimations.SlideTop:
        this.slideTop(scene, options);
        break;
      case EngineSceneRendererAnimations.SlideRight:
        this.slideRight(scene, options);
        break;
      case EngineSceneRendererAnimations.SlideBottom:
        this.slideBottom(scene, options);
        break;
      case EngineSceneRendererAnimations.SlideLeft:
        this.slideLeft(scene, options);
    }
  }

  private getSlideParams(scene: EngineScene): ISlideParams {
    const context = scene.sys.context;
    const contextWidth = this.engine.config.width;
    const contextHeight = this.engine.config.height;
    const prevScene = this.engine.scenesHistory.prev();

    return { context, contextWidth, contextHeight, prevScene };
  }

  private drawSceneSprites(params: IDrawSceneSpritesParams): void {
    const { context, coord, coordValue, scene, name, config } = params;
    const image = scene.sprites.get(name);

    if (context instanceof CanvasRenderingContext2D) {
      if (coord === 'x') {
        context.drawImage(image, coordValue, config.y);
      } else {
        context.drawImage(image, config.x, coordValue);
      }
    }
  }

  private slideLeft(scene: EngineScene, options: IEngineSceneRendererOptions) {
    const { context, contextWidth, contextHeight, prevScene } = this.getSlideParams(scene);
    let prevSceneComplete = false;
    let currSceneComplete = false;
    let prevSceneX = 0;
    let currSceneX = contextWidth;

    this.engineSceneRenderer.prerender(scene);
    this.engine.disableEvents();

    const intervalId = setInterval(() => {
      this.engineSceneRenderer.clearRect();

      if (!prevSceneComplete) {
        if (prevSceneX <= -contextWidth) {
          for (const [sprite, config] of prevScene.spritesMap) {
            this.drawSceneSprites({ scene: prevScene, config, coord: 'x', coordValue: prevSceneX, name: sprite, context });
          }

          prevSceneComplete = true;
        } else {
          for (const [sprite, config] of prevScene.spritesMap) {
            prevSceneX -= options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene: prevScene, config, coord: 'x', coordValue: prevSceneX + config.x, name: sprite, context });
          }
        }
      }

      if (!currSceneComplete) {
        if (currSceneX <= 0) {
          for (const [sprite, config] of scene.spritesMap) {
            this.drawSceneSprites({ scene, config, coord: 'x', coordValue: currSceneX, name: sprite, context });
          }

          currSceneComplete = true;
          this.engineSceneRenderer.clearRect();
          this.engineSceneRenderer.finalizeRender(scene);
          prevScene.destroy();
          this.engine.enableEvents();
          clearInterval(intervalId);
        } else {
          for (const [sprite, config] of scene.spritesMap) {
            currSceneX -= options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene, config, coord: 'x', coordValue: currSceneX + config.x, name: sprite, context });
          }
        }
      }
    }, 0);
  }

  private slideRight(scene: EngineScene, options: IEngineSceneRendererOptions) {
    const { context, contextWidth, contextHeight, prevScene } = this.getSlideParams(scene);
    let prevSceneComplete = false;
    let currSceneComplete = false;
    let prevSceneX = 0;
    let currSceneX = -contextWidth;

    this.engineSceneRenderer.prerender(scene);
    this.engine.disableEvents();

    const intervalId = setInterval(() => {
      this.engineSceneRenderer.clearRect();

      if (!prevSceneComplete) {
        if (prevSceneX >= contextWidth) {
          for (const [sprite, config] of prevScene.spritesMap) {
            this.drawSceneSprites({ scene: prevScene, config, coord: 'x', coordValue: prevSceneX, name: sprite, context });
          }

          prevSceneComplete = true;
        } else {
          for (const [sprite, config] of prevScene.spritesMap) {
            prevSceneX += options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene: prevScene, config, coord: 'x', coordValue: prevSceneX + config.x, name: sprite, context });
          }
        }
      }

      if (!currSceneComplete) {
        if (currSceneX >= 0) {
          for (const [sprite, config] of scene.spritesMap) {
            this.drawSceneSprites({ scene, config, coord: 'x', coordValue: currSceneX, name: sprite, context });
          }

          currSceneComplete = true;
          this.engineSceneRenderer.clearRect();
          this.engineSceneRenderer.finalizeRender(scene);
          prevScene.destroy();
          this.engine.enableEvents();
          clearInterval(intervalId);
        } else {
          for (const [sprite, config] of scene.spritesMap) {
            currSceneX += options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene, config, coord: 'x', coordValue: currSceneX + config.x, name: sprite, context });
          }
        }
      }
    }, 0);
  }

  private slideBottom(scene: EngineScene, options: IEngineSceneRendererOptions) {
    const { context, contextWidth, contextHeight, prevScene } = this.getSlideParams(scene);
    let prevSceneComplete = false;
    let currSceneComplete = false;
    let prevSceneY = 0;
    let currSceneY = -contextHeight;

    this.engineSceneRenderer.prerender(scene);
    this.engine.disableEvents();

    const intervalId = setInterval(() => {
      this.engineSceneRenderer.clearRect();

      if (!prevSceneComplete) {
        if (prevSceneY >= contextHeight) {
          for (const [sprite, config] of prevScene.spritesMap) {
            this.drawSceneSprites({ scene: prevScene, config, coord: 'y', coordValue: prevSceneY, name: sprite, context });
          }

          prevSceneComplete = true;
        } else {
          for (const [sprite, config] of prevScene.spritesMap) {
            prevSceneY += options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene: prevScene, config, coord: 'y', coordValue: prevSceneY + config.y, name: sprite, context });
          }
        }
      }

      if (!currSceneComplete) {
        if (currSceneY >= 0) {
          for (const [sprite, config] of scene.spritesMap) {
            this.drawSceneSprites({ scene, config, coord: 'y', coordValue: currSceneY, name: sprite, context });
          }

          currSceneComplete = true;
          this.engineSceneRenderer.clearRect();
          this.engineSceneRenderer.finalizeRender(scene);
          prevScene.destroy();
          this.engine.enableEvents();
          clearInterval(intervalId);
        } else {
          for (const [sprite, config] of scene.spritesMap) {
            currSceneY += options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene, config, coord: 'y', coordValue: currSceneY + config.y, name: sprite, context });
          }
        }
      }
    }, 0);
  }

  private slideTop(scene: EngineScene, options: IEngineSceneRendererOptions): void {
    const { context, contextWidth, contextHeight, prevScene } = this.getSlideParams(scene);
    let prevSceneComplete = false;
    let currSceneComplete = false;
    let prevSceneY = 0;
    let currSceneY = contextHeight;

    this.engineSceneRenderer.prerender(scene);

    this.engine.disableEvents();
    const intervalId = setInterval(() => {
      this.engineSceneRenderer.clearRect();

      if (!prevSceneComplete) {
        if (prevSceneY <= -contextHeight) {
          for (const [sprite, config] of prevScene.spritesMap) {
            this.drawSceneSprites({ scene: prevScene, config, coord: 'y', coordValue: prevSceneY, name: sprite, context });
          }

          prevSceneComplete = true;
        } else {
          for (const [sprite, config] of prevScene.spritesMap) {
            prevSceneY -= options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene: prevScene, config, coord: 'y', coordValue: prevSceneY + config.y, name: sprite, context });
          }
        }
      }

      if (!currSceneComplete) {
        if (currSceneY <= 0) {
          for (const [sprite, config] of scene.spritesMap) {
            this.drawSceneSprites({ scene, config, coord: 'y', coordValue: currSceneY, name: sprite, context });
          }

          currSceneComplete = true;
          if (context instanceof CanvasRenderingContext2D) {
            context.globalAlpha = 1;
          }
          this.engineSceneRenderer.clearRect();
          this.engineSceneRenderer.finalizeRender(scene);
          prevScene.destroy();
          this.engine.enableEvents();
          clearInterval(intervalId);
        } else {
          for (const [sprite, config] of scene.spritesMap) {
            currSceneY -= options.animation.velocity ?? this.defaultVelocityOffset;
            this.drawSceneSprites({ scene, config, coord: 'y', coordValue: currSceneY + config.y, name: sprite, context });
          }
        }
      }
    }, 0);
  }
}
