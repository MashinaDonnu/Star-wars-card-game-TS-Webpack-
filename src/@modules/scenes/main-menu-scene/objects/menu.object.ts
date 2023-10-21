import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { MenuItemObject } from '@modules/scenes/main-menu-scene/objects/menu-item.object';

export class MenuObject extends Engine.Objects.Template {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 300,
      height: 280,
      x: 30,
      y: 60,
      fill: '#2b2f40',
      name: 'Menu',
      radius: 3,
    });
  }

  init() {}
}
