import './index.scss';
import { Game } from '@modules/game/game';
import { Engine } from '@engine/Engine';
import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { BootScene } from '@modules/scenes/boot-scene/boot.scene';
import { TestScene } from '@modules/scenes/boot-scene/test.scene';

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
    scenes: [TestScene, BootScene],
  });

  game.start().then(() => {
    console.log(game);
  });
}

startGame();
