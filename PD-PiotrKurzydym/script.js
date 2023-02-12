const URL = `https://swapi.dev/api/`;
let newURL;

let mainData = {
  data: null,
  results: null,
  buttons: null,
  category,
  responce: null,
  outcome: [],
};

async function getMainData() {
  const data = await fetch(URL);
  const responce = await data.json();
  mainData.data = responce;
}
function printButtons() {
  if (mainData.data) {
    const $buttonsList = document.getElementById("buttons");
    Object.entries(mainData.data).forEach((item) => {
      const $buttons = document.createElement("button");
      $buttons.innerText = item[0].toUpperCase();
      $buttonsList.appendChild($buttons);
      $buttons.addEventListener("click", async () => {
        pageNumber = 1;
        document.getElementById("pageNumber").value = pageNumber;
        console.log({ pageNumber });
        mainData.category = item[0];
        getData();
      });
    });
  }
}
async function getData() {
  document.getElementById("myTable").innerHTML = "";
  mainData.results = null;
  mainData.outcome.splice(0, mainData.outcome.length);
  let newURL = `https://swapi.dev/api/${mainData.category}/?page=${pageNumber}`;
  const data = await fetch(newURL);
  const responce = await data.json();
  mainData.responce = responce;
  mainData.results = responce.results;
  printResults();
}

function paginationButtons() {
  previousButton = document.getElementById("previous");
  previousButton.addEventListener(`click`, async function () {
    pageNumber -= 1;
    document.getElementById("pageNumber").value = pageNumber;
    console.log({ pageNumber });
    getData();
  });
  nextButton = document.getElementById("next");
  nextButton.addEventListener(`click`, function () {
    pageNumber += 1;
    document.getElementById("pageNumber").value = pageNumber;
    console.log({ pageNumber });
    getData();
  });
}
function printResults() {
  if (mainData.results) {
    mainData.results.forEach((result) => {
      if (mainData.category === "people") {
        [new people({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.category === "planets") {
        [new planets({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.category === "films") {
        [new films({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.category === "species") {
        [new species({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.category === "vehicles") {
        [new vehicles({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.category === "starships") {
        [new starships({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      }
      function setCreated() {
        let date = result.created.slice(0, 10);
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let created = [day + `-` + month + `-` + year];
        return created;
      }
    });
  }
  printTable();
}

function printTable() {
  if (mainData.outcome) {
    let table = document.getElementById("myTable");
    let headerRow = document.createElement("tr");

    let headerText = [`ordinal number`, ...Object.keys(mainData.outcome[0])];
    headerText.forEach((headerOutcome) => {
      let header = document.createElement("th");
      let textNode = document.createTextNode(headerOutcome);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    mainData.outcome.forEach((item, index) => {
      let row = document.createElement("tr");
      let no = index + 1;

      let tableBody = [
        no,
        ...Object.values(item),
        printDeleteButton,
        printDetailsButton,
      ];

      tableBody.forEach((item) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(item);
        typeof item === `function`
          ? cell.appendChild(item())
          : cell.appendChild(textNode);
        row.appendChild(cell);
      });
      table.appendChild(row);

      function printDeleteButton() {
        const deleteButton = document.createElement(`button`);
        deleteButton.className = "delete";
        deleteButton.innerText = `DELETE`;
        return deleteButton;
      }
      function printDetailsButton() {
        const detailsButton = document.createElement(`button`);
        detailsButton.className = "details";
        detailsButton.innerText = `DETAILS`;
        return detailsButton;
      }

      table.addEventListener(`click`, function showModal(event) {
        const modal = document.getElementById("id01");
        modal.style.display = "block";
        if (!event.target.classList.contains(`delete`)) {
          return;
        }
        modalClose = document.getElementById("modalClose");
        modalClose.addEventListener(`click`, function () {
          event = null;
          modal.style.display = "none";
        });
        modalCancelButton = document.getElementById("modalCancelBtn");
        modalCancelButton.addEventListener(`click`, function () {
          event = null;
          modal.style.display = "none";
        });
        modalDeleteButton = document.getElementById("modalDeleteBtn");
        modalDeleteButton.addEventListener(`click`, function () {
          modalDeleteButton = event.target;
          modalDeleteButton.closest("tr").remove();
          modal.style.display = "none";
        });
      });
    });
  }
}

class people {
  constructor({ name, height, mass, hair_color }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hair_color = hair_color;
  }
}
class planets {
  constructor({ name, orbital_period, diameter, climate }) {
    this.name = name;
    this.orbital_period = orbital_period;
    this.diameter = diameter;
    this.climate = climate;
  }
}
class films {
  constructor({ title, episode_id, director, producer }) {
    this.title = title;
    this.episode_id = episode_id;
    this.director = director;
    this.producer = producer;
  }
}
class species {
  constructor({ name, classification, average_height, average_lifespan }) {
    this.name = name;
    this.classification = classification;
    this.average_height = average_height;
    this.average_lifespan = average_lifespan;
  }
}
class vehicles {
  constructor({ name, model, manufacturer, crew }) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.crew = crew;
  }
}
class starships {
  constructor({ name, model, manufacturer, hyperdrive_rating }) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.hyperdrive_rating = hyperdrive_rating;
  }
}

(async function main() {
  await getMainData();
  printButtons();
  paginationButtons();
})();
