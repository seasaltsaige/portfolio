class CWindow {
  /** @type {Project} */
  project;

  // top left of window
  position = { x: 0, y: 0 };

  /** @type {CanvasRenderingContext2D} */
  ctx;

  /** @type {HTMLCanvasElement} */
  canvas;

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


  spawn() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    let width = 300;
    let height = width * 9 / 16;
    ctx.fillStyle = "white";

    this.position

    let time = 0.1;
    const timer = setInterval(() => {
      ctx.fillRect(canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height);

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