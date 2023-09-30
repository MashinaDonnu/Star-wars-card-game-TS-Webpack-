import { Engine } from '@engine/Engine';
import { engineData } from '@engine/engine-data';

export class EngineLoaders {
  private _path = '../assets';

  constructor(
    private namespace: string,
    protected engine: Engine
  ) {}
  image(path: string, name: string) {
    const promise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
      if (!engineData.loaders.image.has(this.namespace)) {
        engineData.loaders.image.set(this.namespace, new Map());
      }
      const images = engineData.loaders.image.get(this.namespace);

      const image = new Image();
      image.src = `${this._path}${path}`;
      image.addEventListener('load', () => {
        images.set(name, image);
        resolve(image);
      });
    });

    if (!engineData.loadersPromises.has(this.namespace)) {
      engineData.loadersPromises.set(this.namespace, new Set());
    }
    const loadersPromises = engineData.loadersPromises.get(this.namespace);
    loadersPromises.add(promise);
    console.log('loadersPromises', engineData.loadersPromises);
  }
}
