import { $detailResult, $detailStart, $detailStop, state } from "/script.js";
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
  yourBMI() {
    const BMI = Math.round(this.mass / Math.pow(this.height / 100, 2));
    $detailResult.innerHTML = `Twój Body Mass Index wynosi ${BMI} `;
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
  showOpening() {
    $detailResult.innerHTML = state.films.results[0].opening_crawl;
  }
}
export class specie extends original {
  constructor({ created, edited, url, language, average_lifespan, designation, name }) {
    super(created, edited, url);
    this.language = language;
    this.average_lifespan = average_lifespan;
    this.designation = designation;
    this.name = name;
  }
  HowLongYouWillLive() {
    this.humanLife = 120;
    const compareToHuman = this.average_lifespan - this.humanLife;
    if (compareToHuman > 0) {
      $detailResult.innerHTML = `${this.name} żyją dłużej niż ludzie o ${compareToHuman}`;
    }
    if (compareToHuman === 0) {
      $detailResult.innerHTML = `${this.name} jesteś człowiekiem lub żyjesz tyle co ludzie`;
    }
    if (compareToHuman < 0) {
      $detailResult.innerHTML = `${this.name} żyją krócej niże ludzie o ${compareToHuman}`;
    }
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
