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
      /** TODO: :( THIS WILL NEED TO BE UPDATED TO CHANGE WITH SCREEN SIZE TOO */
      // Make better >:(
      const headerHeight = Math.min(height / 10, 40);

      ctx.fillStyle = "rgb(30, 30, 30)"
      ctx.beginPath();
      ctx.roundRect(canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, headerHeight, [5, 5, 0, 0])
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "rgb(30, 30, 30)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(1 + canvas.width / 2 - width / 2, canvas.height / 2 - height / 2 + headerHeight);
      ctx.lineTo(-1 + canvas.width / 2 + width / 2, canvas.height / 2 - height / 2 + headerHeight);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.moveTo(canvas.width / 2 + width / 2 - headerHeight / 3, canvas.height / 2 - height / 2 + headerHeight / 3);
      ctx.lineTo(canvas.width / 2 + width / 2 - headerHeight * 2 / 3, canvas.height / 2 - height / 2 + headerHeight * 2 / 3);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + width / 2 - headerHeight * 2 / 3, canvas.height / 2 - height / 2 + headerHeight / 3);
      ctx.lineTo(canvas.width / 2 + width / 2 - headerHeight / 3, canvas.height / 2 - height / 2 + headerHeight * 2 / 3);
      ctx.closePath();
      ctx.stroke();

      // Arrows (Header)
      // I am going to k*ll myself

      // Left
      // Top
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight / 2, canvas.height / 2 - height / 2 + headerHeight / 3.5);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight / 4, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.closePath();
      ctx.stroke();
      // bottom
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight / 4, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight / 2, canvas.height / 2 - height / 2 + headerHeight / 1.4);
      ctx.closePath();
      ctx.stroke();
      // stem
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight / 4, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight / 1.4, canvas.height / 2 - height / 2 + headerHeight / 2)
      ctx.closePath();
      ctx.stroke();

      //Right
      // Top
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight * 1.65, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight * 1.4, canvas.height / 2 - height / 2 + headerHeight / 3.5);
      ctx.closePath();
      ctx.stroke();

      // Bottom
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight * 1.65, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight * 1.4, canvas.height / 2 - height / 2 + headerHeight / 1.4);
      ctx.closePath();
      ctx.stroke();
      // Stem
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width / 2 + headerHeight * 1.2, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - width / 2 + headerHeight * 1.67, canvas.height / 2 - height / 2 + headerHeight / 2);
      ctx.closePath();
      ctx.stroke();


      // Title
      ctx.textAlign = "left";
      ctx.textBaseline = "center";
      ctx.font = `200 ${headerHeight - 20 < 0 ? 0 : headerHeight - 20}px arial`;

      const measurement = ctx.measureText(this.project.name);

      ctx.beginPath();
      ctx.fillStyle = "rgb(20, 20, 20)";
      ctx.roundRect(canvas.width / 2 - width / 2 + headerHeight * 3, canvas.height / 2 - height / 2 + headerHeight / 7, measurement.width + 60, headerHeight * 5 / 7, 4);
      ctx.closePath();
      ctx.fill();
      // Text


      ctx.fillStyle = "rgba(200, 200, 200, 0.75)";
      ctx.fillText(this.project.name, canvas.width / 2 - width / 2 + headerHeight * 3 + 30, canvas.height / 2 - height / 2 + headerHeight / 7 + (headerHeight * 5 / 7) / 2);

      // ctx.stroke();




      width += Math.pow(time, 4);
      height = width * 9 / 16;

      if (width >= canvas.width * 0.75) {
        clearInterval(timer);
      }

      time += 0.1;

    }, 10);
  }
}