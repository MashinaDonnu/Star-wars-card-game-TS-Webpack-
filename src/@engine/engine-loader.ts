import { Engine } from '@engine/engine';
import { engineData } from '@engine/engine-data';
import { GLOBAL_NAMESPACE } from '@engine/const';

export class EngineLoader {
  private _src = '../assets';

  constructor(
    private namespace: string,
    protected engine: Engine
  ) {}
  image(path: string, name: string, isPrivate: boolean = false): void {
    const namespace = isPrivate ? this.namespace : GLOBAL_NAMESPACE;
    if (!engineData.loaders.image.has(namespace)) {
      engineData.loaders.image.set(namespace, new Map());
    }
    const images = engineData.loaders.image.get(namespace);

    if (!images.has(name)) {
      const promise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
        this.engine.elemsInLoading++;
        const image = new Image();
        image.src = `${this._src}${path}`;

        image.addEventListener(
          'load',
          () => {
            if (name !== 'boot-background') {
              setTimeout(() => {
                this.engine.elemsInLoading--;
                this.engine.emitter.emit('load', image);

                images.set(name, image);

                resolve(image);
              }, 3000);
            } else {
              this.engine.elemsInLoading--;
              this.engine.emitter.emit('load', image);
              images.set(name, image);
              resolve(image);
            }
          }
          // { once: true }
        );
      });

      engineData.loadersImagePromises.add(promise);
    }
  }

  audio(path: string, name: string, isPrivate: boolean = false): void {
    const namespace = isPrivate ? this.namespace : GLOBAL_NAMESPACE;
    if (!engineData.loaders.audio.has(namespace)) {
      engineData.loaders.audio.set(namespace, new Map());
    }
    const audios = engineData.loaders.audio.get(namespace);

    if (!audios.has(name)) {
      const promise: Promise<HTMLAudioElement> = new Promise((resolve, reject) => {
        this.engine.elemsInLoading++;

        const audio = new Audio(`${this._src}${path}`);

        setTimeout(() => {
          audios.set(name, audio);
          this.engine.elemsInLoading--;
          audios.set(name, audio);
          this.engine.emitter.emit('load', audio);
          resolve(audio);
        }, 2000);
      });

      engineData.loadersAudioPromises.add(promise);
    }
  }
}
