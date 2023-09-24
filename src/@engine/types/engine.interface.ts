import { IAbstractScene } from '@engine/types/scene.interface';

export interface IEngine {
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
