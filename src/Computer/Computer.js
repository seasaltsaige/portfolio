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

      console.log(this.windows, icon);
      if (this.windows.find(w => w.project.name === icon.project_data.name) !== undefined)
        return;

      const pWindow = new CWindow(icon.project_data, ctx, canvas);
      // Add window based on icon clicked
      // if (this.windows.find())
      this.windows.push(pWindow);
      pWindow.spawn();

    };

    canvas.ondragstart = (ev) => {

    }
    canvas.ondrag = (ev) => {

    }
    canvas.ondragend = (ev) => {

    }

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

        await this.sleep(250);
        row_i++;
        if (row_i === max_col_len) {
          row_i = 0;
          col_i++;
        }


        // const x = (i % projPerCol - projPerCol / 2 + 0.5) * spacing;
        // const y = (Math.floor(i / projPerCol) - projPerRow / 2 + 0.5) * spacing;

        // ctx.fillRect(start_x + x, start_y + y, size, size);
      }

      this._navbar_();
      this._initFunctions_();


      // console.log(data);
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

    this._navbar_();
  }

  /**
   * @private
   * Renders the app toolbar along the bottom of the screen. Updates as items get added to the open windows
   */
  _navbar_() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, canvas.height - 73, canvas.width - 3, canvas.height);
    ctx.fillStyle = "#222128";
    ctx.fillRect(0, canvas.height - 70, canvas.width, canvas.height);
    ctx.fillStyle = "#1b1a20";
    ctx.fillRect(20, canvas.height - 60, 50, 50)

    const power = new Image();
    power.onload = () => {
      ctx.drawImage(power, 20, canvas.height - 60, 50, 50);
    }
    power.src = "./ProjectImages/power.png";

  }

  // _main_() {

  // }



}