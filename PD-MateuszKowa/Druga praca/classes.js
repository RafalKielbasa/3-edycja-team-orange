export class original {
  constructor(edited, created, url) {
    this.edited = edited;
    this.created = created;
    this.url = url;
  }
}
export class person extends original {
  constructor(edited, created, url, name, skin_color, height, mass) {
    super(edited, created, url);
    this.name = name;
    this.skin_color = skin_color;
    this.height = height;
    this.mass = mass;
  }
}
export class planet extends original {
  constructor(edited, created, url, name, climate, population) {
    super(edited, created, url);
    this.name = name;
    this.climate = climate;
    this.population = population;
  }
}
export class film extends original {
  constructor(edited, created, url, title, episode_id, release_date) {
    super(edited, created, url);
    this.title = title;
    this.episode_id = episode_id;
    this.release_date = release_date;
  }
}
export class specie extends original {
  constructor(edited, created, url, name, language, designation) {
    super(edited, created, url);
    this.name = name;
    this.language = language;
    this.designation = designation;
  }
}
export class vehicle extends original {
  constructor(edited, created, url, name, crew, model) {
    super(edited, created, url);
    this.name = name;
    this.crew = crew;
    this.model = model;
  }
}
export class starship extends original {
  constructor(edited, created, url, name, max_atmosphering_speed, model) {
    super(edited, created, url);
    this.name = name;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.model = model;
  }
}
