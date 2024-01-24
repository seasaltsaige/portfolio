class CWindow {
  /** @type {Project} */
  project;

  // top left of window
  position = { x: 0, y: 0 };

  /** @type {CanvasRenderingContext2D} */
  ctx;

  /** @type {HTMLCanvasElement} */
  canvas;

  is_focused = false;

  /**
   * @param {Project} proj 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(proj, ctx, canvas) {
    this.project = proj;
    this.ctx = ctx;
    this.canvas = canvas;
  }

  focus() {
    this.is_focused = true;
  }
  unfocus() {
    this.is_focused = false;
  }

  spawn() {
    this.focus();
    const canvas = this.canvas;
    const ctx = this.ctx;

    let width = 300;
    let height = width * 9 / 16;
    // ctx.fillStyle = "white";

    this.position

    let time = 0.1;
    const timer = setInterval(() => {
      ctx.fillStyle = "rgb(60, 60, 60)";
      ctx.strokeStyle = "rgb(66, 85, 206)";

      ctx.lineWidth = 0.5;
      ctx.beginPath();
      if (this.is_focused) {
        ctx.shadowBlur = Math.min(Math.max(width / 100, 5), 30);
        ctx.shadowColor = "rgb(0, 0, 0, 0.5)";
      }
      ctx.roundRect(canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = null;
      ctx.shadowColor = null;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2, canvas.height / 2 - height / 2 + Math.min(height / 10, 40) /** TODO: :( THIS WILL NEED TO BE UPDATED TO CHANGE WITH SCREEN SIZE TOO */);
      ctx.lineTo(canvas.width / 2 + width / 2, canvas.height / 2 - height / 2 + Math.min(height / 10, 40));
      ctx.closePath();
      ctx.stroke();

      width += Math.pow(time, 4);
      height = width * 9 / 16;

      const textSize = height / 15;
      // ctx.fillText();

      if (width >= canvas.width * 0.75)
        clearInterval(timer);

      time += 0.1;

    }, 10);
  }
}