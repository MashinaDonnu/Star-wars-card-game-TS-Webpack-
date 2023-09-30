import { IAbstractScene } from '@engine/types/scene.interface';
import { TEngineContext } from '@engine';

export interface IEngine {
  context: TEngineContext;
  onPreload: Function;
  onRender: Function;
  update(): void;
  registerScene(scene: IAbstractScene): void;
  setScenes(scenes: IAbstractScene[]): void;
  draw(): void;
  run(): void;
  start(): void;
  stop(): void;
}
