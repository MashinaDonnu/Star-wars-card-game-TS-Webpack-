import {IEngine} from "@engine/custom/types/engine.interface";
import {EGraphicsEngine} from "@engine/custom/enums/graphics-engine.enum";

export class Engine {
    private root$: HTMLElement;
    private ctx: CanvasRenderingContext2D;

    constructor(private config: IEngine) {}

    run(): void {
        this.initPlayground()

        this.config.scenes.forEach((scene) => {
            scene.init();
        });
    }

    private initPlayground(): void {
        this.root$ = document.createElement('div');

        switch (this.config.graphicEngine) {
            case EGraphicsEngine.Canvas: {
                this.initCanvas();
            }
        }
    }

    private initCanvas(): void {
        const { width, height } = this.config;
        const canvasElement = document.createElement('canvas');
        canvasElement.width = width;
        canvasElement.height = height;

        this.ctx = canvasElement.getContext('2d');
        this.root$.append(canvasElement);
    }
}
