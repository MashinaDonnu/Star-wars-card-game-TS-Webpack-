import './index.scss';
import { Game } from '@modules/Game/Game';
import { Engine } from '@engine/Engine';
import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';

function startGame() {
  const engine = new Engine({
    scenes: [],
    graphicEngine: EGraphicsEngine.Canvas,
    width: 360,
    height: 720,
  });

  const game = new Game({
    engine,
    store: {},
    scenes: [],
  });

  game.start().then(() => {
    console.log(game);
  });
}

startGame();
