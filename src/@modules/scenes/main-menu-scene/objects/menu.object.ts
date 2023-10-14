import { Engine } from '@engine';
import { EngineScene } from '@engine/scenes/engine-scene';
import { MenuItemObject } from '@modules/scenes/main-menu-scene/objects/menu-item.object';

export class MenuObject extends Engine.Objects.Template {
  constructor(scene: EngineScene) {
    super(scene, {
      width: 150,
      height: 250,
      x: 50,
      y: 50,
      fill: '#000',
      name: 'Menu',
    });
  }

  init() {
    const itemsText = ['one', 'two', 'three', 'four'];

    let offset = 0;
    for (let i = 0; i < itemsText.length; i++) {
      const item = new MenuItemObject(this.scene, this, itemsText[i], {
        width: this.params.width,
        height: 20,
        x: this.x,
        y: this.y + offset,
        fill: '#ccc',
        name: 'item' + i,
      });
      offset += 22;
    }
  }
}
