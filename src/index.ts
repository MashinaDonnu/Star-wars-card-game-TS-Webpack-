import './index.scss';
import { Game } from '@modules/game/game';
import { Engine } from '@engine/engine';
import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { BootScene } from '@modules/scenes/boot-scene/boot.scene';
import { PreviewScene } from '@modules/scenes/preview-scene/preview.scene';
import { MainMenuScene } from '@modules/scenes/main-menu-scene/main-menu.scene';
import { SettingsScene } from '@modules/scenes/settings-scene/settings.scene';

function startGame() {
  const engine = new Engine({
    scenes: [],
    graphicEngine: EGraphicsEngine.Canvas,
    width: 720,
    height: 360,
  });

  const game = new Game({
    engine,
    store: {},
    scenes: [PreviewScene, BootScene, MainMenuScene, SettingsScene],
  });

  game.start().then(() => {
    console.log(game);
  });
}

startGame();
