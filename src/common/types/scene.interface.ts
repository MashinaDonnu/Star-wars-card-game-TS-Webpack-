export interface IScene {
    preload(): void;
    init(): void;
    update(): void;
    destroy(): void;
}
