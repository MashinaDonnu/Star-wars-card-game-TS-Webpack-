
export interface IAbstractScene {
    init(): void;
    preload(): void;
    render(): void;
    update(): void;
    destroy(): void;
}
