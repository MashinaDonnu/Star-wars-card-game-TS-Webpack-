import './index.scss';
import { Game } from '@modules/game/game';
import { Engine } from '@engine/Engine';
import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { BootScene } from '@modules/scenes/boot-scene/boot.scene';

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
    scenes: [BootScene],
  });

  game.start().then(() => {
    console.log(game);
  });
}

startGame();
