import { IAbstractScene } from '@engine/types/scene.interface';
import { ISceneConfig } from '@engine';

export abstract class AbstractScene implements IAbstractScene {
  private _name: string;

  protected constructor(name: string) {
    this._name = name;
  }
  destroy(): void {}

  init(): void {}

  preload(): void {}

  render(): void {}

  update(): void {}
}
