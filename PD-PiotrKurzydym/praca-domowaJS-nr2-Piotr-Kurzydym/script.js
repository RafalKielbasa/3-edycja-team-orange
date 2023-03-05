const URL = `https://swapi.dev/api/`;
let newURL;
btnAct = [];

let mainData = {
  data: null,
  results: null,
  buttons: null,
  category: null,
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
      previousButton = document.getElementById("previous");
      previousButton.disabled = true;
      nextButton = document.getElementById("next");
      nextButton.disabled = true;
      searchButton = document.getElementById("searchBtn");
      searchButton.disabled = true;
      btnAct.push($buttons);

      $buttons.addEventListener("click", () => {
        btnAct.forEach((item) => {
          item.classList.remove("active");
        });
        $buttons.classList.toggle("active");
        previousButton.disabled = false;
        nextButton.disabled = false;
        searchButton.disabled = false;
        pageNumber = 1;
        document.getElementById("pageNumber").value = pageNumber;
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
  if (mainData.responce.previous === null) {
    previousButton.disabled = true;
  } else previousButton.disabled = false;
  if (mainData.responce.next === null) {
    nextButton.disabled = true;
  } else nextButton.disabled = false;
  const maxPageNumber = Math.ceil(mainData.responce.count / 10);
  document.getElementById("maxPageNumber").value = maxPageNumber;
  printResults();
}
function paginationButtons() {
  previousButton.addEventListener(`click`, async function () {
    pageNumber -= 1;
    document.getElementById("pageNumber").value = pageNumber;
    getData();
  });
  nextButton.addEventListener(`click`, function () {
    pageNumber += 1;
    document.getElementById("pageNumber").value = pageNumber;
    getData();
  });
}
function validation(event) {
  event.preventDefault();
  const serchedPage = document.getElementById("searchPage").value;
  document.getElementById(`searchPage`).value = "";
  pageNumber = Number(serchedPage);
  document.getElementById("pageNumber").value = pageNumber;
  getData();
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

      function setNo(number) {
        if (number === 1) {
          no = index + 1;
        } else if (number === 2) {
          no = index + 11;
        } else if (number === 3) {
          no = index + 21;
        } else if (number === 4) {
          no = index + 31;
        } else if (number === 5) {
          no = index + 41;
        } else if (number === 6) {
          no = index + 51;
        } else if (number === 7) {
          no = index + 61;
        } else if (number === 8) {
          no = index + 71;
        } else if (number === 9) {
          no = index + 81;
        } else if (number === 10) {
          no = index + 91;
        }
        return no;
      }

      let tableBody = [
        setNo(pageNumber),
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
        detailsButton.addEventListener(`click`, function () {
          printDetailsTable();
        });
        return detailsButton;
      }
      function printDetailsTable() {
        if (mainData.results) {
          let closeDetailsButton = document.getElementById("close");
          let detailsTable = document.getElementById("details");
          let detailsHeaderRow = document.createElement("tr");
          let detailsRow = document.createElement("tr");

          detailsTable.style.display = "block";
          table.style.display = "none";
          closeDetailsButton.style.display = "block";

          let detailsHeaderText = [...Object.keys(mainData.results[index])];
          detailsHeaderText.forEach((detailsHeaderOutcome) => {
            let detailsHeader = document.createElement("th");
            let detailsTextNode = document.createTextNode(detailsHeaderOutcome);
            detailsHeader.appendChild(detailsTextNode);
            detailsHeaderRow.appendChild(detailsHeader);
          });
          detailsTable.appendChild(detailsHeaderRow);

          let detailsTableBody = [...Object.values(mainData.results[index])];

          detailsTableBody.forEach((detailsItem) => {
            let detailsCell = document.createElement("td");
            let detailsTextNode = document.createTextNode(detailsItem);
            detailsCell.appendChild(detailsTextNode);
            detailsRow.appendChild(detailsCell);
          });
          detailsTable.appendChild(detailsRow);

          closeDetailsButton.addEventListener(`click`, function () {
            detailsTable.style.display = "none";
            closeDetailsButton.style.display = "none";
            table.style.display = "block";
            detailsHeaderRow.remove();
            detailsRow.remove();
          });
        }
      }
      table.addEventListener(`click`, function showModal(event) {
        if (!event.target.classList.contains(`delete`)) {
          return;
        }
        const modal = document.getElementById("id01");
        modal.style.display = "block";
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
