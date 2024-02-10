class CWindow {
  /** 
   * @type {{
   * name: string;
   * short_description: string;
   * long_description: string;
   * url: string;
   * image_url: string;
   * icon_url: string;
   * }} 
   */
  project;

  headerHeight = 0;

  // top left of window
  position = { x: 0, y: 0 };

  /** @type {CanvasRenderingContext2D} */
  ctx;

  /** @type {HTMLCanvasElement} */
  canvas;

  // 0 = home, 1 = description (hopefully render readme.md)
  selectedPage = 0;

  size = {
    width: 0,
    height: 0,
  }

  is_focused = false;

  /**
   * @param {{
   * name: string;
  * short_description: string;
  * long_description: string;
  * url: string;
  * image_url: string;
  * icon_url: string;
  * }} proj 
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

    this.size.width = 300;
    this.size.height = this.size.width * 9 / 16;

    // ctx.fillStyle = "white";

    this.position

    let time = 0.1;
    const timer = setInterval(() => {
      ctx.fillStyle = "rgb(60, 60, 60)";
      ctx.strokeStyle = "rgb(66, 85, 206)";

      ctx.lineWidth = 0.5;
      ctx.beginPath();
      if (this.is_focused) {
        ctx.shadowBlur = Math.min(Math.max(this.size.width / 100, 5), 30);
        ctx.shadowColor = "rgb(0, 0, 0, 0.5)";
      }
      ctx.roundRect(canvas.width / 2 - this.size.width / 2, canvas.height / 2 - this.size.height / 2, this.size.width, this.size.height, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = null;
      ctx.shadowColor = null;
      /** TODO: :( THIS WILL NEED TO BE UPDATED TO CHANGE WITH SCREEN SIZE TOO */
      // Make better >:(
      this.headerHeight = Math.min(this.size.height / 10, 40);

      ctx.fillStyle = "rgb(30, 30, 30)"
      ctx.beginPath();
      ctx.roundRect(canvas.width / 2 - this.size.width / 2, canvas.height / 2 - this.size.height / 2, this.size.width, this.headerHeight, [5, 5, 0, 0])
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "rgb(30, 30, 30)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(1 + canvas.width / 2 - this.size.width / 2, canvas.height / 2 - this.size.height / 2 + this.headerHeight);
      ctx.lineTo(-1 + canvas.width / 2 + this.size.width / 2, canvas.height / 2 - this.size.height / 2 + this.headerHeight);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.moveTo(canvas.width / 2 + this.size.width / 2 - this.headerHeight / 3, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 3);
      ctx.lineTo(canvas.width / 2 + this.size.width / 2 - this.headerHeight * 2 / 3, canvas.height / 2 - this.size.height / 2 + this.headerHeight * 2 / 3);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + this.size.width / 2 - this.headerHeight * 2 / 3, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 3);
      ctx.lineTo(canvas.width / 2 + this.size.width / 2 - this.headerHeight / 3, canvas.height / 2 - this.size.height / 2 + this.headerHeight * 2 / 3);
      ctx.closePath();
      ctx.stroke();

      // Arrows (Header)
      // I am going to k*ll myself

      // Left
      // Top
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 2, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 3.5);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.closePath();
      ctx.stroke();
      // bottom
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 2, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 1.4);
      ctx.closePath();
      ctx.stroke();
      // stem
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight / 1.4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2)
      ctx.closePath();
      ctx.stroke();

      //Right
      // Top
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.65, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 3.5);
      ctx.closePath();
      ctx.stroke();

      // Bottom
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.65, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.4, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 1.4);
      ctx.closePath();
      ctx.stroke();
      // Stem
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.2, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.lineTo(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 1.67, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 2);
      ctx.closePath();
      ctx.stroke();


      // Title
      ctx.textAlign = "left";
      ctx.textBaseline = "center";
      ctx.font = `200 ${this.headerHeight - 20 < 0 ? 0 : this.headerHeight - 20}px arial`;

      const measurement = ctx.measureText(this.project.name);

      ctx.beginPath();
      ctx.fillStyle = "rgb(20, 20, 20)";
      ctx.roundRect(canvas.width / 2 - this.size.width / 2 + this.headerHeight * 3, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 7, measurement.width + 60, this.headerHeight * 5 / 7, 4);
      ctx.closePath();
      ctx.fill();
      // Text


      ctx.fillStyle = "rgba(200, 200, 200, 0.75)";
      ctx.fillText(this.project.name, canvas.width / 2 - this.size.width / 2 + this.headerHeight * 3 + 30, canvas.height / 2 - this.size.height / 2 + this.headerHeight / 7 + (this.headerHeight * 5 / 7) / 2);

      // ctx.stroke();



      if (this.size.width >= canvas.width * 0.7) {

        this.position.x = (canvas.width / 2) - (this.size.width / 2);
        this.position.y = (canvas.height / 2) - (this.size.height / 2);
        clearInterval(timer);
        this.renderWindow();
        // this.renderTitle();
        // this.renderLinks();
        return;
      }

      this.size.width += Math.pow(time, 4);
      this.size.height = this.size.width * 9 / 16;
      time += 0.1;

    }, 10);



  }













  /**
   * Renders each individual window that is open
   */
  renderWindow() {


    ctx.fillStyle = "rgb(60, 60, 60)";
    ctx.strokeStyle = "rgb(66, 85, 206)";

    ctx.lineWidth = 0.5;
    ctx.beginPath();
    if (this.is_focused) {
      ctx.shadowBlur = Math.min(Math.max(this.size.width / 100, 5), 30);
      ctx.shadowColor = "rgb(0, 0, 0, 0.5)";
    }
    ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = null;
    ctx.shadowColor = null;
    /** TODO: :( THIS WILL NEED TO BE UPDATED TO CHANGE WITH SCREEN SIZE TOO */
    // Make better >:(
    this.headerHeight = Math.min(this.size.height / 10, 40);

    ctx.fillStyle = "rgb(30, 30, 30)"
    ctx.beginPath();
    ctx.roundRect(this.position.x, this.position.y, this.size.width, this.headerHeight, [5, 5, 0, 0])
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgb(30, 30, 30)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(1 + this.position.x, this.position.y + this.headerHeight);
    ctx.lineTo(-1 + this.position.x + this.size.width, this.position.y + this.headerHeight);
    ctx.closePath();
    ctx.stroke();


    // X
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.moveTo(this.position.x + this.size.width - this.headerHeight / 3, this.position.y + this.headerHeight / 3);
    ctx.lineTo(this.position.x + this.size.width - this.headerHeight * 2 / 3, this.position.y + this.headerHeight * 2 / 3);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.position.x + this.size.width - this.headerHeight * 2 / 3, this.position.y + this.headerHeight / 3);
    ctx.lineTo(this.position.x + this.size.width - this.headerHeight / 3, this.position.y + this.headerHeight * 2 / 3);
    ctx.closePath();
    ctx.stroke();

    // Arrows (Header)
    // I am going to k*ll myself

    // Left
    // Top
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight / 2, this.position.y + this.headerHeight / 3.5);
    ctx.lineTo(this.position.x + this.headerHeight / 4, this.position.y + this.headerHeight / 2);
    ctx.closePath();
    ctx.stroke();
    // bottom
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight / 4, this.position.y + this.headerHeight / 2);
    ctx.lineTo(this.position.x + this.headerHeight / 2, this.position.y + this.headerHeight / 1.4);
    ctx.closePath();
    ctx.stroke();
    // stem
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight / 4, this.position.y + this.headerHeight / 2);
    ctx.lineTo(this.position.x + this.headerHeight / 1.4, this.position.y + this.headerHeight / 2)
    ctx.closePath();
    ctx.stroke();

    //Right
    // Top
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight * 1.65, this.position.y + this.headerHeight / 2);
    ctx.lineTo(this.position.x + this.headerHeight * 1.4, this.position.y + this.headerHeight / 3.5);
    ctx.closePath();
    ctx.stroke();

    // Bottom
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight * 1.65, this.position.y + this.headerHeight / 2);
    ctx.lineTo(this.position.x + this.headerHeight * 1.4, this.position.y + this.headerHeight / 1.4);
    ctx.closePath();
    ctx.stroke();
    // Stem
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.headerHeight * 1.2, this.position.y + this.headerHeight / 2);
    ctx.lineTo(this.position.x + this.headerHeight * 1.67, this.position.y + this.headerHeight / 2);
    ctx.closePath();
    ctx.stroke();


    // Title
    ctx.textAlign = "left";
    ctx.textBaseline = "center";
    ctx.font = `200 ${this.headerHeight - 20 < 0 ? 0 : this.headerHeight - 20}px arial`;

    const measurement = ctx.measureText(this.project.name);

    ctx.beginPath();
    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.roundRect(this.position.x + this.headerHeight * 3, this.position.y + this.headerHeight / 7, measurement.width + 60, this.headerHeight * 5 / 7, 4);
    ctx.closePath();
    ctx.fill();
    // Text


    ctx.fillStyle = "rgba(200, 200, 200, 0.75)";
    ctx.fillText(this.project.name, this.position.x + this.headerHeight * 3 + 30, this.position.y + this.headerHeight / 7 + (this.headerHeight * 5 / 7) / 2);

    this.renderTitle();
    this.renderLinks();


    // Project Home
    // - images, short synopsis


    // Project Description
    // - Link to project


  }

  renderTitle() {
    // p for project
    const pWidth = this.size.width;
    const pHeight = this.size.height

    // top left corner of window
    const x = this.position.x;
    const y = this.position.y;

    ctx.font = "35px bold arial";
    ctx.textAlign = "center";

    const title = this.selectedPage === 0 ? "Home" : "Description";
    this.ctx.fillText(title, x + pWidth / 2, y + this.headerHeight + 30);
  }

  renderLinks() {
    const ctx = this.ctx;
    // c for canvas
    const cWidth = ctx.canvas.width;
    const cHeight = ctx.canvas.height;

    // p for project
    const pWidth = this.size.width;
    const pHeight = this.size.height

    // top left corner of window
    const x = this.position.x;
    const y = this.position.y;

    ctx.font = "25px bold arial";

    ctx.textAlign = "center";

    const selectedColor = "rgb(30, 30, 30)";

    ctx.beginPath();
    ctx.roundRect(x + pWidth / 3, y + this.headerHeight + 70, 80, 40, 5);

    ctx.fill();
    ctx.closePath();


    // ctx.fillText("Home", x + pWidth / 2, y + this.headerHeight + 50);

  }


  /**
   * 
   * @param {"Left" | "Middle" | "Right" | null} mouseType 
   * @param {{x: number; y: number}} mousePos 
   */
  onclick(mouseType, mousePos) {



  }

  ondblclick() {

  }



}