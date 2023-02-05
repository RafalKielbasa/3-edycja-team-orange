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
  state.classes = {
    [btn]: createClasses(btn, state.data[btn]),
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
    state.activeBtn = textBtn;
    await fetchUrls(data, textBtn);
    createTable();
    console.log(state);
  });
};

const createTable = () => {
  if (!state.activeBtn) {
    return;
  }
  const $dataTable = document.getElementById('table');

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const trHead = document.createElement('tr');
  thead.appendChild(trHead);
  Object.keys(state.classes[state.activeBtn][1]).forEach((key) => {
    const th = document.createElement('th');
    th.innerHTML = key;
    trHead.appendChild(th);
  });

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  state.classes[state.activeBtn].forEach((item) => {
    const trbody = document.createElement('tr');
    Object.values(item).forEach((value) => {
      const td = document.createElement('td');
      td.innerHTML = value;
      trbody.appendChild(td);
    });
    tbody.appendChild(trbody);
  });

  $dataTable.appendChild(table);
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

const correctDate = (date) => {
  const oldDate = date.slice(0, 10).split('-');
  const newDate = oldDate[1] + '-' + oldDate[2] + '-' + oldDate[0];
  return newDate;
};

class Peolpe {
  constructor({ name, height, mass, gender, created, edited }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
    this.created = correctDate(created);
    this.edited = correctDate(edited);
  }
}
class Planets {
  constructor({
    name,
    climate,
    rotation_period,
    orbital_period,
    created,
    edited,
  }) {
    this.name = name;
    this.climate = climate;
    this.rotationPeriod = rotation_period;
    this.orbitalPeriod = orbital_period;
    this.created = correctDate(created);
    this.edited = correctDate(edited);
  }
}
class Films {
  constructor({ title, director, release_date, episode_id, created, edited }) {
    this.title = title;
    this.director = director;
    this.releaseDate = release_date;
    this.episodeId = episode_id;
    this.created = correctDate(created);
    this.edited = correctDate(edited);
  }
}
class Species {
  constructor({
    name,
    classification,
    designation,
    skin_colors,
    created,
    edited,
  }) {
    this.name = name;
    this.classification = classification;
    this.designation = designation;
    this.skinColor = skin_colors;
    this.created = correctDate(created);
    this.edited = correctDate(edited);
  }
}
class Vehicles {
  constructor({ name, model, manufacturer, cost_in_credits, created, edited }) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.costInCredits = cost_in_credits;
    this.created = correctDate(created);
    this.edited = correctDate(edited);
  }
}
class Statships extends Vehicles {
  constructor({ name, model, manufacturer, cost_in_credits, created, edited }) {
    super({ name, model, manufacturer, cost_in_credits, created, edited });
  }
}
