const container = document.getElementById('container');
const api = 'https://swapi.dev/api/';
const state = {
  urls: null,
  people: null,
  planets: null,
};
async function fetchData() {
  const response = await fetch(api);
  const data = await response.json();
  createButtons(data);

  return data;
}

async function fetchUrls(item, btn) {
  const response = await fetch(item);
  const data = await response.json();
  state[btn] = createClasses(btn, data.results);
  console.log(state);
}

const main = async () => {
  console.log('run');
  state.urls = await fetchData();

  console.log(state.urls);
};
main();

function createButtons(data) {
  Object.entries(data).forEach((item) => {
    const button = document.createElement('button');
    button.innerText = item[0];
    container.appendChild(button);
    button.addEventListener('click', async () => {
      await fetchUrls(item[1], button.innerText);
    });
  });
}

function createClasses(btn, response) {
  return response.map((item) => {
    switch (btn) {
      case 'people':
        const people = new Peolpe({ ...item });
        return people;
    }
  });
}

class Peolpe {
  constructor({ name, height, mass, gender }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
  }
}
class Planets {
  constructor(name, climate, rotationPeriod, orbitalPeriod) {
    this.name = name;
    this.climate = climate;
    this.rotationPeriod = rotationPeriod;
    this.orbitalPeriod = orbitalPeriod;
  }
}
class Films {
  constructor(title, director, releaseDate, episodeId) {
    this.title = title;
    this.director = director;
    this.releaseDate = releaseDate;
    this.episodeId = episodeId;
  }
}
class Species {
  constructor(name, ckassIfication, designation, skinColor) {
    this.name = name;
    this.ckassIfication = ckassIfication;
    this.designation = designation;
    this.skinColor = skinColor;
  }
}
class Vehicles {
  constructor(name, model, manufacturer, costInCredits) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.costInCredits = costInCredits;
  }
}
class Statships extends Vehicles {
  constructor(name, model, manufacturer, costInCredits) {
    super(name, model, manufacturer, costInCredits);
  }
}
