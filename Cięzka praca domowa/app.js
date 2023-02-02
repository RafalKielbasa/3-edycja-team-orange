const container = document.getElementById('container');
const dataTable = document.getElementById('table');
const header = document.getElementById('header');
const api = 'https://swapi.dev/api/';
const urls = {
  url: null,
};
const state = {
  activeBtn: null,
  people: null,
  planets: null,
  films: null,
  species: null,
  vehicles: null,
  starships: null,
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
  urls.url = await fetchData();

  console.log(urls.url);
};
main();
function createButtons(data) {
  Object.entries(data).forEach((item) => {
    const button = document.createElement('button');
    button.innerText = item[0];
    header.appendChild(button);
    button.addEventListener('click', async () => {
      await fetchUrls(item[1], button.innerText);
      createTable(state, button.innerText);
      state.activeBtn = button.innerText;
    });
  });
}

function createClasses(btn, response) {
  return response.map((item) => {
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
}

function createTable(data, btn) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  let headers = [];
  let stateTable = {
    people: null,
    planets: null,
    films: null,
    species: null,
    vehicles: null,
    starships: null,
  };

  if (state.activeBtn !== btn) {
    data[btn].map((item) => {
      headers = Object.keys(item);
    });
    headers.forEach((value) => {
      const header = document.createElement('th');
      const headerText = document.createTextNode(value);
      header.appendChild(headerText);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    data[btn].forEach((item) => {
      const row = document.createElement('tr');

      Object.values(item).forEach((value) => {
        const cell = document.createElement('td');
        const cellText = document.createTextNode(value);
        cell.appendChild(cellText);
        row.appendChild(cell);
      });

      table.appendChild(row);
    });
    dataTable.appendChild(table);
  }

  console.log(stateTable);
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
