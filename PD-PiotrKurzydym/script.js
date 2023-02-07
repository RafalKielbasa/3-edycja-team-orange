const URL = `https://swapi.dev/api/`;
let newURL;

const mainData = {
  data: null,
  results: null,
  button: null,
  responce: null,
  outcome: [],
};

async function getMainData() {
  const data = await fetch(URL);
  const responce = await data.json();
  mainData.data = responce;
}

async function printButtons() {
  if (mainData.data) {
    const $buttonsList = document.getElementById("buttons");
    Object.entries(mainData.data).forEach((item) => {
      const $buttons = document.createElement("button");
      $buttons.innerText = item[0].toUpperCase();
      $buttonsList.appendChild($buttons);
      $buttons.addEventListener("click", async () => {
        document.getElementById("myTable").innerHTML = "";
        mainData.results = null;
        mainData.button = null;
        mainData.outcome.splice(0, mainData.outcome.length);
        let newURL = `https://swapi.dev/api/${item[0]}/?page=1`;
        const data = await fetch(newURL);
        const responce = await data.json();
        mainData.responce = responce;
        mainData.results = responce.results;
        mainData.button = $buttons.innerText;
        printResults();
      });
    });
  }
}

function printResults() {
  if (mainData.results) {
    mainData.results.forEach((result) => {
      if (mainData.button === "PEOPLE") {
        [new people({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.button === "PLANETS") {
        [new planets({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.button === "FILMS") {
        [new films({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.button === "SPECIES") {
        [new species({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.button === "VEHICLES") {
        [new vehicles({ ...result })].forEach((el) => {
          mainData.outcome.push({ ...el, created: setCreated() });
        });
      } else if (mainData.button === "STARSHIPS") {
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
    // let t = document.createTextNode("ppp");
    // header.appendChild(t);

    Object.entries(mainData.outcome).forEach(([key, value]) => {
      let row = document.createElement("tr");
      let no = Number(key) + 1;

      let tableBody = [no, ...Object.values(value)];
      // let t = (document.innerHTML += `
      // <tr>
      //     <td><button>Delete</button></td>
      // </tr>
      // `);

      function printExtraButtons() {
        const btn = document.createElement(`button`);
        btn.innerText = `Delete`;
        return btn;
        // const tBodyEl = document.getElementsByTagName("th");
        // e.preventDefault();
      }

      tableBody.forEach((item) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(item);
        cell.appendChild(textNode);
        row.appendChild(cell);
      });
      table.appendChild(row);
      // table.appendChild(t);
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
  await printButtons();
})();
