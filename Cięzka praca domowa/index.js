const BASE_URL = 'https://swapi.dev/api/';
const state = {
  activeBtn: null,
  urls: null,
  data: {},
  classes: {},
};

const fetchData = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

const fetchUrls = async (item, btn) => {
  const response = await fetch(item);
  const data = await response.json();
  state.data = {
    ...state.data,
    [btn]: data.results,
  };
  console.log(data);
};

const buttons = (data) => {
  const $header = document.getElementById('header');
  Object.entries(data).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.innerText = key;
    $header.appendChild(button);
    headerButtonEvent(button, button.innerText, value);
  });
};

const headerButtonEvent = async (btn, textBtn, data) => {
  btn.addEventListener('click', async () => {
    await fetchUrls(data, textBtn);
    state.classes = {
      [textBtn]: createClasses(textBtn, state.data[textBtn]),
    };
    state.activeBtn = textBtn;
    console.log(state);
  });
};

const createClasses = (btn, data) => {
  return data.map((item) => {
    switch (btn) {
      case 'people':
        const people = new Peolpe({ ...item });
        return people;
      case 'planets':
        const planets = new Planets({ ...item });
        return planets;
      case 'films':
        const films = new Films({ ...item });
        return films;
      case 'species':
        const species = new Species({ ...item });
        return species;
      case 'vehicles':
        const vehicles = new Vehicles({ ...item });
        return vehicles;
      case 'starships':
        const starships = new Statships({ ...item });
        return starships;
    }
  });
};

const main = async () => {
  state.urls = await fetchData();
  buttons(state.urls);
  console.log(state.urls);
};
main();

class Peolpe {
  constructor({ name, height, mass, gender }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
  }
}
class Planets {
  constructor({ name, climate, rotation_period, orbital_period }) {
    this.name = name;
    this.climate = climate;
    this.rotationPeriod = rotation_period;
    this.orbitalPeriod = orbital_period;
  }
}
class Films {
  constructor({ title, director, release_date, episode_id }) {
    this.title = title;
    this.director = director;
    this.releaseDate = release_date;
    this.episodeId = episode_id;
  }
}
class Species {
  constructor({ name, classification, designation, skin_colors }) {
    this.name = name;
    this.classification = classification;
    this.designation = designation;
    this.skinColor = skin_colors;
  }
}
class Vehicles {
  constructor({ name, model, manufacturer, cost_in_credits }) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.costInCredits = cost_in_credits;
  }
}
class Statships extends Vehicles {
  constructor({ name, model, manufacturer, cost_in_credits }) {
    super({ name, model, manufacturer, cost_in_credits });
  }
}
