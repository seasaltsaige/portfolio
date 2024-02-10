class Project {
  pos = { x: 0, y: 0 };
  project_data = {
    name: "",
    short_description: "",
    long_description: "",
    url: "",
    image_url: "",
    icon_url: "",
  }

  /**
   * 
   * @param {string} name 
   * @param {string} short_description 
   * @param {string} long_description 
   * @param {string} url 
   * @param {string} image_url 
   * @param {string} icon_url 
   * @param {{x: number, y: number}} position 
   */
  constructor(name, short_description, long_description, url, image_url, icon_url, position) {
    this.project_data = {
      name,
      short_description,
      long_description,
      url,
      image_url,
      icon_url
    }

    this.pos = position;
  }



}