import { $detailResult, $detailStart, $detailStop } from "/script.js";
export class original {
  constructor(created, edited, url) {
    this.created = changeDate(created);
    this.edited = changeDate(edited);
    this.url = url;
  }
}
export class person extends original {
  constructor({ created, edited, url, skin_color, height, mass, name }) {
    super(created, edited, url);
    this.skin_color = skin_color;
    this.height = height;
    this.mass = mass;
    this.name = name;
  }
}
export class planet extends original {
  constructor({ created, edited, url, diameter, climate, population, name }) {
    super(created, edited, url);
    this.diameter = diameter;
    this.climate = climate;
    this.population = population;
    this.name = name;
  }
  compareToEarth() {
    this.eartsDiam = 12742;
    this.proportion = Math.round((this.diameter / this.eartsDiam) * 100);
    const text = this.proportion;
    $detailResult.innerHTML = `Średnica ${this.name} stanowi ${text}% średnicy Ziemi`;
  }
}
export class film extends original {
  constructor({ created, edited, url, episode_id, release_date, title }) {
    super(created, edited, url);
    this.episode_id = episode_id;
    this.release_date = release_date;
    this.title = title;
  }
}
export class specie extends original {
  constructor({ created, edited, url, language, designation, name }) {
    super(created, edited, url);
    this.language = language;
    this.designation = designation;
    this.name = name;
  }
}
export class vehicle extends original {
  constructor({ created, edited, url, crew, model, name }) {
    super(created, edited, url);
    this.crew = crew;
    this.model = model;
    this.name = name;
  }
}
export class starship extends original {
  constructor({ created, edited, url, max_atmosphering_speed, model, name }) {
    super(created, edited, url);
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.model = model;
    this.name = name;
  }
  drive() {
    this.km = 0;
    this.isDriving = null;
    this.isDriving = setInterval(() => {
      this.km += +this.max_atmosphering_speed;
    }, 500);
  }
  stop() {
    clearInterval(this.isDriving);
    const text = `W sumie przeleciałeś ${this.km} Km`;
    $detailResult.innerHTML = text;
  }
}
function changeDate(data) {
  const date = data.split("T");
  const splittedDate = date[0].split("-");
  splittedDate.reverse();
  const result = splittedDate.join("-");
  return result;
}
