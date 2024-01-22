class CWindow {
  /** @type {Project} */
  project;

  position = { x: 0, y: 0 };

  /** @type {CanvasRenderingContext2D} */
  ctx;

  /** @type {HTMLCanvasElement} */
  canvas;

  /**
   * @param {Project} proj 
   */
  constructor(proj, ctx, canvas) {
    this.project = proj;
  }


  spawn() {

  }

}