import { IGameConfig } from '@modules/game/types/game-config.interface';
import { EventEmitter } from '@engine/emitter/EventEmitter';
import { EngineScene } from '@engine/scenes/engine-scene';
import { Engine } from '@engine';

export class Game {
  private _engine: Engine;
  private _store: any;
  private emitter = new EventEmitter();
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

    const engineScenes: EngineScene[] = [];

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
