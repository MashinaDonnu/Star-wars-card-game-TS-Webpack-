import { IEngineObject } from '@engine/types/engine-object.interface';
import { AbstractObject, IAbstractObjectParams } from '@engine/objects/abstract-object';

export interface SpriteObjectParams extends IAbstractObjectParams {}

export class SpriteObject extends AbstractObject {
  constructor(params: SpriteObjectParams) {
    super(params);
  }
}
