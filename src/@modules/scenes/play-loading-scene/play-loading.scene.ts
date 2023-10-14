import { Engine } from '@engine';

export class PlayLoadingScene extends Engine.Scene {
  constructor() {
    super('PlayLoading');
  }

  init(): void {
    const context = this.sys.context;
    const canvas = context.canvas;
    const spinnerRadius = 50;

    const spinnerSpeed = (2 * Math.PI) / 100; // Скорость в радианах

    let rotation = 0;

    const drawSpinner = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Вращение спиннера
      rotation += spinnerSpeed;

      // Нарисуйте задний фон (после очистки холста)
      this.renderSceneSprite('play-loading', {
        width: this.sys.config.width,
        height: this.sys.config.height,
        x: 0,
        y: 0,
      });

      // Сохраните текущее состояние контекста
      context.save();

      // Переведите контекст в центр холста
      context.translate(canvas.width / 2, canvas.height / 2);

      // Вращение спиннера
      context.rotate(rotation);

      // Нарисуйте спиннер
      context.beginPath();
      context.arc(0, 0, spinnerRadius, 0, Math.PI * 2, false);
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.fill();

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(spinnerRadius, 0);
      context.strokeStyle = 'rgba(255, 255, 255, 0.8';
      context.stroke();

      // Восстановите предыдущее состояние контекста

      // Восстановите предыдущее состояние контекста
      context.restore();

      requestAnimationFrame(drawSpinner);
    };
    drawSpinner();
  }

  preload(): void {
    this.load.image('/images/play-loading.webp', 'play-loading');
  }

  render(): void {
    this.renderSceneSprite('play-loading', {
      width: this.sys.config.width,
      height: this.sys.config.height,
      x: 0,
      y: 0,
    });
  }

  update(): void {}
}
