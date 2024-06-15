const BASE_URL = `https://swapi.dev/api/`;
const $container = document.getElementById('container');
const $dataTable = document.getElementById('table');
const $contentContainer = document.getElementById('contentContainer');
const $popup = document.getElementById('popup');
const $pagination = document.getElementById('pagination');
const $detailsTable = document.getElementById('details');
const state = {
  info: {},
  activeBtn: null,
  urls: null,
  data: {},
  classes: {},
  currentPage: 1,
  checkedEl: {},
};

const fetchData = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

const fetchUrls = async (btn) => {
  const response = await fetch(
    `${state.urls[state.activeBtn]}/?page=${state.currentPage}`
  );
  const data = await response.json();
  state.info = data;
  state.data = {
    ...state.data,
    [btn]: data.results,
  };
  state.classes = {
    [btn]: createClasses(btn, state.data[btn]),
  };

  console.log('data', state.info);
  console.log('next page', state.info.next);
};

const buttons = (data) => {
  const $header = document.getElementById('header');
  Object.entries(data).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.innerText = key;
    button.addEventListener('click', function () {
      state.currentPage = 1;
      state.activeBtn = button.innerText;
      $detailsTable.innerHTML = '';
      $popup.style.display = 'none';
      $contentContainer.style.justifyContent = 'center';
      soundEffect();
    });

    $header.appendChild(button);
    headerButtonEvent(button, button.innerText);
  });
};

const headerButtonEvent = async (btn, textBtn) => {
  btn.addEventListener('click', async () => {
    await fetchUrls(textBtn);
    createTable(textBtn);
    console.log('state data from active btn => ', state.data[state.activeBtn]);
  });
};

const createTable = () => {
  $dataTable.innerHTML = '';

  const table = document.createElement('table');

  createThead(table);

  createTbody(table);

  console.log(table);
  $dataTable.appendChild(table);
  createPagination();
};

const createThead = (item) => {
  const thead = document.createElement('thead');
  item.appendChild(thead);

  const trHead = document.createElement('tr');
  thead.appendChild(trHead);

  const lpHead = document.createElement('th');
  lpHead.innerHTML = 'lp';
  trHead.append(lpHead);

  const searchInput = document.createElement('input');
  searchPeople(searchInput);

  Object.keys(state.classes[state.activeBtn][1]).forEach((key) => {
    const th = document.createElement('th');
    th.innerHTML = key;
    trHead.appendChild(th);
    trHead.append(searchInput);
  });
};

const createTbody = (table) => {
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  const checkboxDeleteButton = document.createElement('button');
  checkboxDeleteButton.innerHTML = 'delete checked';
  $dataTable.append(checkboxDeleteButton);

  state.classes[state.activeBtn].forEach((item, index) => {
    const detailsBtn = document.createElement('button');
    detailsBtn.innerHTML = 'details';
    detailsButtonEvent(detailsBtn, index);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';

    const deleteCheckbox = document.createElement('input');
    deleteCheckbox.setAttribute('type', 'checkbox');

    const trbody = document.createElement('tr');

    const lpBody = document.createElement('td');

    trbody.appendChild(lpBody);
    deleteBtnEvent(deleteBtn, trbody);
    handleCheckbox(deleteCheckbox, trbody, checkboxDeleteButton);

    Object.values(item).forEach((value) => {
      lpBody.innerHTML = index + 1;
      const td = document.createElement('td');
      td.innerHTML = value;

      trbody.appendChild(td);
      trbody.append(detailsBtn);
      trbody.append(deleteBtn);
      trbody.append(deleteCheckbox);
    });

    tbody.appendChild(trbody);
  });
};

const searchPeople = (input) => {
  input.addEventListener('keypress', async function (key) {
    if (key.key === 'Enter') {
      const inputValue = input.value;
      const response = await fetch(
        `${BASE_URL}${state.activeBtn}/?search=${inputValue}`
      );
      const data = await response.json();

      console.log('search data', data.results);

      createDetailsTable(data.results[0]);
    }
  });
};

const handleCheckbox = (box, tr, btn) => {
  btn.addEventListener('click', function () {
    if (box.checked == true) {
      tr.remove();
    }
  });
};

const createDetailsTable = (data) => {
  $detailsTable.innerHTML = '';
  const detailsTable = document.createElement('table');

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&larr;';
  $detailsTable.appendChild(closeBtn);

  createDetailsThead(detailsTable, data);
  $detailsTable.appendChild(detailsTable);
  createDetailsTbody(detailsTable, data);
  closeButtonEventOnDetails(closeBtn, detailsTable);
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

const createDetailsTbody = (table, item) => {
  const detailsTbody = document.createElement('tbody');
  table.appendChild(detailsTbody);

  const detailrTrbody = document.createElement('tr');

  Object.values(item).forEach((value) => {
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

const detailsButtonEvent = (btn, index) => {
  btn.addEventListener('click', function () {
    $contentContainer.style.justifyContent = 'start';

    console.log('test', state.data[state.activeBtn]);

    createDetailsTable(state.data[state.activeBtn][index]);
  });
};

const closeButtonEventOnDetails = (btn, table) => {
  btn.addEventListener('click', function () {
    table.remove();
    btn.remove();
    $contentContainer.style.justifyContent = 'center';
  });
};

const createModal = (tr) => {
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

const deleteBtnEvent = (btn, tr) => {
  btn.addEventListener('click', function () {
    $popup.innerHTML = '';
    createModal(tr);
    $popup.style.display = 'flex';
  });
};

const createPagination = () => {
  const paginationDiv = document.createElement('div');
  paginationDiv.style.display = 'flex';
  paginationDiv.style.justifyContent = 'center';
  paginationDiv.style.gap = '5px';
  $dataTable.appendChild(paginationDiv);

  const input = document.createElement('input');
  input.style.width = '20px';

  inputChoosePage(input);

  const nextButton = document.createElement('button');
  nextButton.innerHTML = 'NEXT';
  nextButtonEvent(nextButton);

  const prevButton = document.createElement('button');
  prevButton.innerHTML = 'PREV';

  prevButtonEvent(prevButton);

  const pageCounter = document.createElement('span');
  pageCounter.innerHTML = `${state.currentPage}/${Math.ceil(
    state.info.count / 10
  )}`;

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(nextButton);
  paginationDiv.appendChild(input);
  paginationDiv.appendChild(pageCounter);
};

const inputChoosePage = (input) => {
  input.addEventListener('keypress', async function (key) {
    if (key.key === 'Enter') {
      state.currentPage = input.value;

      await fetchUrls(state.activeBtn);
      createTable();

      console.log('current Page', state.currentPage);
    }
  });
};

const nextButtonEvent = (btn) => {
  if (state.info.next) {
    btn.addEventListener('click', async function () {
      state.currentPage++;
      await fetchUrls(state.activeBtn);
      createTable();
      console.log('page => ', state.currentPage);
      console.log('next', state.info.next);
    });
  } else {
    btn.disabled = true;
  }
};

const prevButtonEvent = (btn) => {
  if (state.currentPage > 1) {
    btn.addEventListener('click', async function () {
      state.currentPage--;
      await fetchUrls(state.activeBtn);
      createTable();
      console.log('page => ', state.currentPage);
    });
  } else {
    btn.disabled = true;
  }
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

const soundEffect = () => {
  const sound = new Audio();
  sound.src = './Quadlaser turret fire.mp3';
  sound.volume = 0.01;
  sound.play();
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

  console.log('urls', state.urls);
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
