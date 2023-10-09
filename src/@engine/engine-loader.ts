import { Engine } from '@engine/Engine';
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
        const image = new Image();
        image.src = `${this._src}${path}`;
        image.addEventListener(
          'load',
          () => {
            images.set(name, image);
            setTimeout(() => {
              resolve(image);
            }, 1000);
          },
          { once: true }
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
        const audio = new Audio(`${this._src}${path}`);
        audio.addEventListener(
          'canplaythrough',
          () => {
            audios.set(name, audio);
            setTimeout(() => {
              resolve(audio);
            }, 1000);
          },
          { once: true }
        );
      });

      engineData.loadersAudioPromises.add(promise);
    }
  }
}
