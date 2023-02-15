const BASE_URL = `https://swapi.dev/api/`;
const $container = document.getElementById('container');
const $dataTable = document.getElementById('table');
const $contentContainer = document.getElementById('contentContainer');
const $details = document.getElementById('details');
const $popup = document.getElementById('popup');
const $pagination = document.getElementById('pagination');
const state = {
  activeBtn: null,
  urls: null,
  data: {},
  classes: {},
  nextPage: null,
  previousPage: null,
  currentPage: 1,
};

const fetchData = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

const fetchUrls = async (item, btn) => {
  const response = await fetch(`${item}/?page=${state.currentPage}`);
  const data = await response.json();
  state.data = {
    ...state.data,
    [btn]: data.results,
  };
  state.classes = {
    [btn]: createClasses(btn, state.data[btn]),
  };
  state.nextPage = data.next;
  state.previousPage = data.previous;
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
    createTable(textBtn);
    createPagination();
    $details.innerHTML = '';
    $popup.style.display = 'none';
    $contentContainer.style.justifyContent = 'center';
    console.log(state.nextPage);
    console.log(state.data[state.activeBtn]);
  });
};

const createTable = () => {
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
    detailsButtonEvent(detailsBtn, index);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';

    const trbody = document.createElement('tr');
    const lpBody = document.createElement('td');
    trbody.appendChild(lpBody);
    deleteBtnEvent(deleteBtn, index, trbody);

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

const detailsButtonEvent = (btn, index) => {
  btn.addEventListener('click', function () {
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&larr;';

    $contentContainer.style.justifyContent = 'start';
    const $detailsTable = document.getElementById('details');
    $detailsTable.innerHTML = '';
    const detailsTable = document.createElement('table');
    $detailsTable.appendChild(closeBtn);

    createDetailsThead(detailsTable, index);
    $detailsTable.appendChild(detailsTable);
    createDetailsTbody(detailsTable, index);

    closeButtonEventOnDetails(closeBtn, detailsTable);
  });
};

const closeButtonEventOnDetails = (btn, table) => {
  btn.addEventListener('click', function () {
    table.remove();
    btn.remove();
    $contentContainer.style.justifyContent = 'center';
  });
};

const createModal = (index, tr) => {
  const modalContent = document.createElement('div');
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = 'Are you sure?';
  modalDiv.style.justifyContent = 'center';
  const yesButton = document.createElement('button');
  yesButton.innerHTML = 'YES';
  modalYesButton(yesButton, tr);
  const noButton = document.createElement('button');
  noButton.innerHTML = 'NO';
  modalNoButtonEvent(noButton);

  modalContent.appendChild(modalDiv);
  modalContent.appendChild(yesButton);
  modalContent.appendChild(noButton);
  $popup.appendChild(modalContent);
};

const modalYesButton = (btn, tr) => {
  btn.addEventListener('click', function () {
    $popup.style.display = 'none';
    tr.remove();
  });
};

const modalNoButtonEvent = (btn) => {
  btn.addEventListener('click', function () {
    $popup.style.display = 'none';
  });
};

const deleteBtnEvent = (btn, index, tr) => {
  btn.addEventListener('click', function () {
    $popup.innerHTML = '';
    createModal(index, tr);
    $popup.style.display = 'flex';
  });
};

const createDetailsThead = (table) => {
  const detailsThead = document.createElement('thead');
  table.appendChild(detailsThead);

  const detailsTr = document.createElement('tr');
  detailsThead.appendChild(detailsTr);

  Object.keys(state.data[state.activeBtn][1]).forEach((key) => {
    const detailsTh = document.createElement('th');

    detailsTh.innerHTML = key;
    detailsTr.appendChild(detailsTh);
  });
};

const createDetailsTbody = (table, index) => {
  const detailsTbody = document.createElement('tbody');
  table.appendChild(detailsTbody);

  const detailrTrbody = document.createElement('tr');

  Object.values(state.data[state.activeBtn][index]).forEach((value) => {
    const detailsTd = document.createElement('td');

    const checkArray = Array.isArray(value);

    if (!checkArray) {
      detailsTd.innerHTML = value;
    } else if (value.length == 0) {
      detailsTd.innerHTML = 'N/A';
    } else {
      const select = createSelect(value);
      detailsTd.appendChild(select);
    }

    detailrTrbody.appendChild(detailsTd);
  });

  detailsTbody.appendChild(detailrTrbody);
};

const createPagination = () => {
  const paginationDiv = document.createElement('div');
  paginationDiv.style.display = 'flex';
  paginationDiv.style.justifyContent = 'center';
  paginationDiv.style.gap = '5px';
  $dataTable.appendChild(paginationDiv);

  const input = document.createElement('input');
  input.style.width = '20px';

  const nextButton = document.createElement('button');
  nextButton.innerHTML = 'NEXT';
  nextButtonEvent(nextButton);

  const prevButton = document.createElement('button');
  prevButton.innerHTML = 'PREV';

  prevButtonEvent(prevButton);

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(nextButton);
  paginationDiv.appendChild(input);
};

const nextButtonEvent = (btn) => {
  btn.addEventListener('click', function () {
    state.currentPage++;
    fetchUrls(state.activeBtn);
    console.log(state.currentPage);
  });
};

const prevButtonEvent = (btn) => {
  btn.addEventListener('click', function () {
    state.currentPage--;
    fetchUrls;
    console.log(state.currentPage);
  });
};

const createSelect = (urls) => {
  const select = document.createElement('select');
  select.value = '';
  urls.forEach((url) => {
    const option = document.createElement('option');
    option.innerHTML = url;
    option.value = url;
    select.appendChild(option);
  });
  return select;
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
