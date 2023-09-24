import { IGameConfig } from '@modules/Game/types/game-config.interface';
import { IEngine } from '@engine';
import { IAbstractScene } from '@engine/types/scene.interface';

export class Game {
  private _engine: IEngine;
  private _store: any;
  private emitter: any;
  constructor(private config: IGameConfig) {
    this._engine = config.engine;
  }

  async start(): Promise<void> {
    const engine = this._engine;
    engine.onPreload = () => {
      console.log('onPreload');
    };
    engine.onRender = () => {
      console.log('onRender');
    };

    const engineScenes: IAbstractScene[] = [];

    for (const Scene of this.config.scenes) {
      const scene = new Scene({
        store: this._store,
        globalEmitter: this.emitter,
        engine,
      });

      engineScenes.push(scene);
    }

    this._engine.setScenes(engineScenes);
    this._engine.run();
  }
}
