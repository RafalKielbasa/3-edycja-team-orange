const BASE_URL = 'https://swapi.dev/api/';
const $container = document.getElementById('container');
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
    await fetchUrls(data, textBtn);
    state.activeBtn = textBtn;
    createTable(textBtn);
    console.log(state);
    console.log(state.data[state.activeBtn]);
  });
};

const createTable = () => {
  const $dataTable = document.getElementById('table');
  $dataTable.innerHTML = '';
  const table = document.createElement('table');

  createThead(table);

  createTbody(table);

  console.log(table);
  $dataTable.appendChild(table);
};

const createThead = (item) => {
  const thead = document.createElement('thead');
  item.appendChild(thead);

  const trHead = document.createElement('tr');
  thead.appendChild(trHead);

  const lpHead = document.createElement('th');
  lpHead.innerHTML = 'lp';
  trHead.append(lpHead);

  Object.keys(state.classes[state.activeBtn][1]).forEach((key) => {
    const th = document.createElement('th');
    th.innerHTML = key;
    trHead.appendChild(th);
  });
};

const createTbody = (item) => {
  const tbody = document.createElement('tbody');
  item.appendChild(tbody);

  state.classes[state.activeBtn].forEach((item, index) => {
    const detailsBtn = document.createElement('button');

    detailsBtn.innerHTML = 'details';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';

    const trbody = document.createElement('tr');
    const lpBody = document.createElement('td');
    trbody.appendChild(lpBody);

    detailsBtn.addEventListener('click', () => {
      const $contentContainer = document.getElementById('contentContainer');
      const details = document.createElement('div');
      $contentContainer.appendChild(details);
      Object.values(state.data[state.activeBtn]).forEach((item, index) => {
        details.innerHTML = item[index];
      });
    });

    Object.values(item).forEach((value) => {
      lpBody.innerHTML = index + 1;
      const td = document.createElement('td');
      td.innerHTML = value;

      trbody.appendChild(td);
      trbody.append(detailsBtn);
      trbody.append(deleteBtn);
    });

    tbody.appendChild(trbody);
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
