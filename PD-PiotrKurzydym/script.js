const URL = `https://swapi.dev/api/`;
let newURL;

const mainData = {
  data: null,
  results: null,
  button: null,
  outcome: null,
};

async function getMainData() {
  const data = await fetch(`https://swapi.dev/api/`);
  const responce = await data.json();
  mainData.data = responce;
}

async function printButtons() {
  if (mainData.data) {
    const $buttonsList = document.getElementById("buttons");
    Object.entries(mainData.data).forEach((item) => {
      const $buttons = document.createElement("button");
      $buttons.innerText = item[0];
      $buttonsList.appendChild($buttons);
      $buttons.addEventListener("click", async () => {
        mainData.results = null;
        mainData.button = null;
        let newURL = `https://swapi.dev/api/${item[0]}/`;
        const data = await fetch(newURL);
        const responce = await data.json();
        mainData.results = responce.results;
        mainData.button = $buttons.innerText;
        printResults();
      });
    });
  }
}

async function printResults() {
  if (mainData.results) {
    document.getElementById("results").innerHTML = "";
    const $resultsList = document.getElementById("results");
    const $list = document.createElement("ul");
    mainData.results.forEach((result) => {
      if (mainData.button === "people") {
        mainData.outcome = new people({ ...result });
      } else if (mainData.button === "planets") {
        mainData.outcome = new planets({ ...result });
      } else if (mainData.button === "films") {
        mainData.outcome = new films({ ...result });
      } else if (mainData.button === "species") {
        mainData.outcome = new species({ ...result });
      } else if (mainData.button === "vehicles") {
        mainData.outcome = new vehicles({ ...result });
      } else if (mainData.button === "starships") {
        mainData.outcome = new starships({ ...result });
      }
      let $result = document.createElement("li");
      $result.innerHTML = mainData.outcome.name;
      $list.appendChild($result);
      //
      // Object.entries(mainData.outcome).forEach((item) => {
      //   console.log(`item`, item);
      // });
      // for (key in mainData.outcome) {
      //   console.log(`key`, key);
      // }
      console.log(`mainData.outcome`, mainData.outcome);
    });
    $resultsList.appendChild($list);
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
