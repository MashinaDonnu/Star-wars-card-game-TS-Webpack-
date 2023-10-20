import { Engine } from '@engine';
import { HeroObject } from '@modules/scenes/play-scene/objects/hero.object';
import { CardObject } from '@modules/scenes/play-scene/objects/card.object';
import { HeroObject2 } from '@modules/scenes/play-scene/objects/hero.object2';
import { HeroesBlocks } from '@modules/scenes/play-scene/heroes-blocks';
import { Heroes } from '@modules/scenes/play-scene/heroes';
import { PlaygroundCards } from '@modules/scenes/play-scene/playground-cards';
import { AbstractScene } from 'common/abstract.scene';

export class PlayScene extends AbstractScene {
  cards: CardObject[] = [];
  topHeroBlockWidth: number;
  bottomHeroBlockWidth: number;
  topHeroBlockHeight: number;
  bottomHeroBlockHeight: number;
  playgroundCards: PlaygroundCards;

  heroes: Heroes;
  constructor() {
    super('Play');
  }
  init(): void {
    console.log('INIT');

    // this.cardPlaces();
    // this.cardPlaces2();
    this.playgroundCards = new PlaygroundCards(this);
    const context = this.sys.context;
    const canvas = this.sys.context.canvas;
    const contextWidth = this.sys.config.width;
    const contextHeight = this.sys.config.height;
    const canvasHeight = context.canvas.height;
    const canvasWidth = context.canvas.width;
    const blockWidth = canvas.width * 0.52;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 190;

    this.heroes = new Heroes(this);

    // for (let i = 0; i < 2; i++) {
    //   const card = new CardObject(this, {
    //     x: offsetX + 55 * i + 4,
    //     y: offsetY,
    //     width: 40,
    //     height: 55,
    //     name: 'card' + i,
    //     spriteName: 'card',
    //   });
    //
    //   this.cards.push(card);
    // }

    this.events.mouse.mouseMove((e) => {
      const { mouseX, mouseY } = e;
      for (const card of this.cards) {
        if (card.isDragging) {
          card.x = mouseX - card.dragOffsetX;
          card.y = mouseY - card.dragOffsetY;
          if (context instanceof CanvasRenderingContext2D) {
            context.clearRect(0, 0, contextWidth, contextHeight);
          }
          // this.scene.render();
          this.render();
          this.playgroundCards.initWrappers();
          // this.drawPlayersBlocks();
          // this.cardPlaces();
          // this.cardPlaces2();
          this.objects.forEach((obj) => {
            obj.render();
          });
        }
      }
    });
  }

  preload(): void {
    this.load.image('/images/playground-bg.png', 'playground-bg');
    this.load.image('/images/vader2.png', 'vader');
    this.load.image('/images/obiwan.png', 'obiwan');
    this.load.image('/images/card.png', 'card');
  }

  render(): void {
    super.render();
    const context = this.sys.context;
    const canvas = context.canvas;
    this.renderSceneSprite('playground-bg', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });

    const heroesBlocksWidth = canvas.width * 0.12;
    this.topHeroBlockWidth = heroesBlocksWidth;
    this.bottomHeroBlockWidth = heroesBlocksWidth;
    this.topHeroBlockHeight = 70;
    this.bottomHeroBlockHeight = 80;

    new HeroesBlocks(this, {
      topHeroBlockWidth: heroesBlocksWidth,
      bottomHeroBlockWidth: heroesBlocksWidth,
      topHeroBlockHeight: this.topHeroBlockHeight,
      bottomHeroBlockHeight: this.bottomHeroBlockHeight,
    });
  }

  cardPlaces() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 55;
    const blockWidth = canvas.width * 0.52;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 190;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    context.fill();
    context.closePath();
  }

  cardPlaces2() {
    const context = this.sys.context;
    const canvas = context.canvas;
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const blockHeight = 55;
    const blockWidth = canvas.width * 0.52;
    const offsetX = canvasWidth / 2 - blockWidth / 2;
    const offsetY = 120;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY);
    context.lineTo(offsetX + blockWidth, offsetY + blockHeight);
    context.lineTo(offsetX, offsetY + blockHeight);
    context.strokeStyle = 'red';
    context.fill();
    context.closePath();

    // for (let i = 0; i < 2; i++) {
    //   const card = new CardObject(this, {
    //     x: offsetX + 55 * i + 2.6,
    //     y: offsetY,
    //     width: 40,
    //     height: 55,
    //     name: 'card1' + i,
    //     spriteName: 'card',
    //   });
    // }
  }

  update(): void {}
}
