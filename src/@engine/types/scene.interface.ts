export interface IAbstractScene {
  name: string;
  init(): void;
  preload(): void;
  render(): void;
  update(): void;
  destroy(): void;
}
