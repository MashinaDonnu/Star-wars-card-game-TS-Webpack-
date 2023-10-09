import { Engine } from '@engine/Engine';
import { GLOBAL_NAMESPACE } from '@engine/const';
import { engineData } from '@engine/engine-data';

export class EngineAudio {
  constructor(
    private namespace: string,
    private engine: Engine
  ) {}

  play(name: string, options: any) {
    const context = this.engine.context;
    const audio = this.get(name, !!options.isPrivate);

    audio.play();
  }

  get(name: string, isPrivate: boolean = false) {
    const namespace = isPrivate ? this.namespace : GLOBAL_NAMESPACE;
    return engineData.loaders.audio.get(namespace).get(name);
  }
}
