import {IScene} from "common/types/scene.interface";
import {EGraphicsEngine} from "@engine/custom/enums/graphics-engine.enum";

export interface IEngine {
    graphicEngine: EGraphicsEngine; // TODO Enum
    width: number;
    height: number;
    scenes: IScene[]; // TODO Scene interface
}
