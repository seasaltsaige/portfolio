class ReadMeParser {

  /**
   * @type {string}
   */
  path;

  /** @param {string} path */
  constructor(path) {
    this.path = path;
  }

  readFile() {
    fetch(this.path).then((res) => res.text())
      .then(readme => {
        const lines = readme.split("\n");
        console.log(lines);


      });
  }

}