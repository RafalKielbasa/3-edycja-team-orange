const api = 'https://swapi.dev/api/';
const container = document.getElementById('container');
const state = {
  urls: null,
  results: null,
};

async function fetchData() {
  const response = await fetch(api);
  const dataFetched = await response.json();

  createButtons(dataFetched);
}

function createButtons(data) {
  Object.entries(data).forEach((item) => {
    const button = document.createElement('button');

    button.addEventListener('click', async () => {
      const response = await fetch(item[1]);
      const data = await response.json();
      state.results = data.results;
      console.log(state.results);
    });
    header.appendChild(button);
    button.innerText = item[0].toUpperCase();
  });
}

class Peolpe {
  constructor(name, height, mass, gender) {
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
