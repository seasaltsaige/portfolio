class Computer {
  /**
   * @type {HTMLCanvasElement}
   */
  canvas;
  /**
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  icon_data = {
    size: 80,
    spacing: 60,
    start_x: 70,
    start_y: 70,
    max_col_len: 6,
    max_row_len: 13
  }

  /**
   * @type {{
   *  mouseDown: boolean;
   *  mousePos: { x: number; y: number };
   *  offSetFromWindowOrigin: { x: number; y: number; };
   *  targetWindow: CWindow | null;
   * }}
   */
  dragData = {
    mouseDown: false,
    mousePos: { x: 0, y: 0 },
    offSetFromWindowOrigin: { x: 0, y: 0 },
    targetWindow: null,
  }

  /**
   * @type {CWindow[]}
   */
  windows = [];

  /**
   * @type {Project[]}
   */
  icons = [];

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {HTMLCanvasElement} canvas
   */
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    // Should change based on size of window
    // TODO: Make this actually make sense cause this is arbitrary atm
    this.icon_data.size = canvas.width / 25;

    this._init_();
  }

  /**
   * @private
   * Only should run one time when the class is created
   */
  _init_() {
    this._fade_()
      .then(() => this._firstRender_())
  }

  /** @private */
  async _fade_() {
    return new Promise((res, rej) => {
      const ctx = this.ctx;
      const canvas = this.canvas;
      let opactiy = 0;

      const text = "Welcome to my Portfolio... Please standby";

      const timer = setInterval(() => {
        ctx.fillStyle = `rgba(0, 112, 198, ${opactiy})`;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = `rgba(255, 255, 255, ${opactiy * 2})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 48px arial";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        opactiy += 0.002;
        // TEMP
        if (opactiy >= 0.1) {
          clearInterval(timer);
          res();
        }
      }, 10);
    });
  }


  _initFunctions_() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    canvas.ondblclick = (ev) => {
      const pos = this._mousePos_(ev);

      const icon = this.icons.find((proj) => {
        return (pos.x >= proj.pos.x) &&
          (pos.x <= proj.pos.x + this.icon_data.size) &&
          (pos.y >= proj.pos.y) &&
          (pos.y <= proj.pos.y + this.icon_data.size)
      });
      if (icon === undefined) return;

      if (this.windows.find(w => w.project.name === icon.project_data.name) !== undefined)
        return;

      const pWindow = new CWindow(icon.project_data, ctx, canvas);

      this.windows.push(pWindow);
      pWindow.spawn();

    };

    canvas.onclick = (ev) => {
      const mouseType = this._mouseType_();

      if (mouseType !== "Left") return;

    }

    canvas.onmousedown = (ev) => {
      const mouseType = this._mouseType_(ev);
      if (mouseType !== "Left") return;
      this.dragData.mouseDown = true;

      const mousePos = this._mousePos_(ev);
      this.windows.forEach((w) => w.unfocus());

      const generalFocusFilter = this.windows.filter((window) => (
        (mousePos.x >= window.position.x && mousePos.x <= window.position.x + window.size.width) &&
        (mousePos.y >= window.position.y && mousePos.y <= window.position.y + window.size.height)
      ));

      if (generalFocusFilter.length < 1) return;

      const last = generalFocusFilter[generalFocusFilter.length - 1];
      const ind = this.windows.findIndex((wind) => wind.project.name === last.project.name);
      const reorder = this.windows.splice(ind, 1)[0];
      this.windows.push(reorder);
      reorder.focus();

      this._render_();

      const possibleWindows = this.windows.filter((window) => (
        (mousePos.x >= window.position.x && mousePos.x <= window.position.x + window.size.width) &&
        (mousePos.y >= window.position.y && mousePos.y <= window.position.y + window.headerHeight)
      ));

      if (possibleWindows.length < 1) return;


      const twin = possibleWindows[possibleWindows.length - 1];
      const index = this.windows.findIndex((wind) => wind.project.name === twin.project.name);
      const pwindow = this.windows.splice(index, 1)[0];
      this.windows.push(pwindow);
      this.dragData.targetWindow = pwindow;
      pwindow.focus();

      this.dragData.offSetFromWindowOrigin = { x: mousePos.x - pwindow.position.x, y: mousePos.y - pwindow.position.y };

      this._render_();
    }

    canvas.onmousemove = (ev) => {
      const mouseType = this._mouseType_(ev);
      if (mouseType !== "Left") return;
      if (!this.dragData.mouseDown) return;

      const mousePos = this._mousePos_(ev);

      const window = this.dragData.targetWindow;

      window.position = {
        x: mousePos.x - this.dragData.offSetFromWindowOrigin.x,
        y: mousePos.y - this.dragData.offSetFromWindowOrigin.y,
      }

      this._render_();
    }

    canvas.onmouseup = (ev) => {
      const mouseType = this._mouseType_(ev);
      if (mouseType !== "Left") return;

      this.dragData.mouseDown = false;
      // this.dragData.mousePos = { x: 0, y: 0 };
      this.dragData.offSetFromWindowOrigin = { x: 0, y: 0 };
      this.dragData.targetWindow = null;

    }

  }

  /**
   * @private
   * @param {MouseEvent} ev 
   * @returns 
   */
  _mouseType_(ev) {
    return ev.button === 0 ? "Left" : ev.button === 1 ? "Middle" : ev.button === 2 ? "Right" : null;
  }

  /**
   * @private
   * @param {MouseEvent} ev 
   */
  _mousePos_(ev) {
    return { x: ev.clientX, y: ev.clientY };
  }


  /** 
   * @private 
   * Should run any time a value is changed in this class
   */
  onChange() {
    this._render_();
  }

  /**
   * @private
   * Slightly different than the normal render
   * Providing delays between rendering each icon to make a smoother opening
   */
  _firstRender_() {
    // render icons
    const canvas = this.canvas;
    const ctx = this.ctx;

    // Main background color TODO: Get nice color / svg art as background
    ctx.fillStyle = "#2B2A33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    fetch("./src/Computer/projects.json").then((res) => {
      return res.json();
    }).then(async data => {
      const github = data.github;
      const github_handle = data.github_handle;
      const projects = data.projects;

      ctx.fillStyle = "white";

      const { max_col_len, max_row_len, size, spacing, start_x, start_y } = this.icon_data;

      let row_i = 0;
      let col_i = 0;
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const x = start_x + (size * col_i) + (size * col_i) / 1.5;
        const y = start_y + (size * row_i) + (size * row_i) / 1.5;

        this.icons.push(
          new Project(
            project.name,
            project.short_description,
            project.long_description,
            project.url.replace("{github}", github).replace("{github_handle}", github_handle),
            project.image_url,
            project.icon_url,
            { x, y }
          ),
        );

        ctx.fillRect(x, y, size, size);
        if (project.icon_url !== "") {
          const image = new Image();
          image.onload = () => {
            ctx.drawImage(image, x, y, size, size);
          }
          image.src = project.icon_url;
        }

        ctx.textAlign = "center";
        ctx.font = "normal 12px arial";
        ctx.fillStyle = "black";
        ctx.fillText(project.name, x + size / 2 + 1, y + (size * 1.2) + 1);
        ctx.fillStyle = "white";
        ctx.fillText(project.name, x + size / 2, y + (size * 1.2));

        // TEMP
        await this.sleep(20);
        row_i++;
        if (row_i === max_col_len) {
          row_i = 0;
          col_i++;
        }
      }

      this._navbar_();
      this._initFunctions_();
    })
  }

  async sleep(ms) {
    return new Promise((res, rej) => setTimeout(res, ms));
  }


  /**
   * @private
   * Main render function, utilizes helpers to clean up code
   */
  _render_() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    // Main background color TODO: Get nice color / svg art as background
    ctx.fillStyle = "#2B2A33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const github = data.github;
    // const github_handle = data.github_handle;
    const projects = this.icons;

    ctx.fillStyle = "white";

    const { max_col_len, max_row_len, size, spacing, start_x, start_y } = this.icon_data;

    let row_i = 0;
    let col_i = 0;
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const x = start_x + (size * col_i) + (size * col_i) / 1.5;
      const y = start_y + (size * row_i) + (size * row_i) / 1.5;

      ctx.fillRect(x, y, size, size);
      if (project.project_data.icon_url !== "") {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, x, y, size, size);
        }
        image.src = project.project_data.icon_url;
      }


      ctx.textAlign = "center";
      ctx.font = "normal 12px arial";
      ctx.fillStyle = "black";
      ctx.fillText(project.project_data.name, x + size / 2 + 1, y + (size * 1.2) + 1);
      ctx.fillStyle = "white";
      ctx.fillText(project.project_data.name, x + size / 2, y + (size * 1.2));

      row_i++;
      if (row_i === max_col_len) {
        row_i = 0;
        col_i++;
      }

    }

    this._navbar_();
    for (const window of this.windows) {
      window.renderWindow();
    }


  }

  /**
   * @private
   * Renders the app toolbar along the bottom of the screen. Updates as items get added to the open windows
   */
  _navbar_() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.fillStyle = "#222128";
    ctx.beginPath();
    ctx.roundRect(0, canvas.height - 70, canvas.width, canvas.height, [5, 5, 0, 0]);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = null;
    ctx.shadowColor = null;

    ctx.fillStyle = "#1b1a20";
    ctx.beginPath();
    ctx.roundRect(20, canvas.height - 60, 50, 50, 5);
    ctx.closePath();
    ctx.fill();

    const power = new Image();
    power.onload = () => {
      ctx.drawImage(power, 20, canvas.height - 60, 50, 50);
    }
    power.src = "./ProjectImages/power.png";

  }

}