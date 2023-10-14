import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { MenuItemObject } from '@modules/scenes/main-menu-scene/objects/menu-item.object';

export class MenuObject extends Engine.Objects.Template {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 170,
      height: 145,
      x: 30,
      y: 60,
      fill: '#2b2f40',
      name: 'Menu',
      radius: 3,
    });
  }

  init() {
    const itemsText = ['one', 'two', 'three', 'four'];

    let offset = 5;
    for (let i = 0; i < itemsText.length; i++) {
      const item = new MenuItemObject(this.scene, this, itemsText[i], {
        width: this.params.width,
        height: 30,
        x: this.x,
        y: this.y + offset,
        fill: '#23378c',
        name: 'item' + i,
      });
      offset += 34;
    }
  }
}
