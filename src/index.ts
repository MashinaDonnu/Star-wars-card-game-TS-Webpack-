import './index.scss';
import { Game } from '@modules/game/game';
import { Engine } from '@engine/engine';
import { EGraphicsEngine } from '@engine/enums/graphics-engine.enum';
import { BootScene } from '@modules/scenes/boot-scene/boot.scene';
import { PreviewScene } from '@modules/scenes/preview-scene/preview.scene';
import { MainMenuScene } from '@modules/scenes/main-menu-scene/main-menu.scene';
import { SettingsScene } from '@modules/scenes/settings-scene/settings.scene';
import { PlayLoadingScene } from '@modules/scenes/play-loading-scene/play-loading.scene';
import { PlayIntroScene } from '@modules/scenes/play-intro-scene/play-intro.scene';
import { PlayScene } from '@modules/scenes/play-scene/play-scene';

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
    scenes: [PreviewScene, BootScene, MainMenuScene, SettingsScene, PlayLoadingScene, PlayIntroScene, PlayScene],
  });

  const openModalBtn = <HTMLElement>document.querySelector('.modal');
  const closeModalBtn = <HTMLElement>document.querySelector('.modal__close');
  const playModalBtn = <HTMLElement>document.querySelector('.modal__play');
  const modal = <HTMLElement>document.querySelector('.modal');

  modal.style.display = 'block';
  const modalContent = modal.querySelector('.modal__content');
  modalContent.classList.add('open');

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');

    setTimeout(() => {
      modal.style.display = 'none';
    }, 200);
  });

  playModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');

    game.start().catch(console.log);
    setTimeout(() => {
      modal.style.display = 'none';
    }, 200);
  });
}

startGame();
