const apiUrl = "https://swapi.dev/api/";
const sectionBtn = document.querySelector("#section_btn");
const tr1 = document.querySelector("#tr-1");
const th = document.getElementsByTagName("th");

const getStarWarsApi = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    const data = await response
      .json()
      .then((data) => addSectionButtonsToPage(Object.keys(data)));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getSectionData = async (section) => {
  tr1.innerHTML = "";
  try {
    const response = await fetch(`${apiUrl}${section}`);
    await response.json().then((data) => new StarWarsConstructor(data));
  } catch (error) {
    console.log(error);
  }
};
getStarWarsApi();

const addSectionButtonsToPage = (data) => {
  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement("button");
    elem.type = "button";
    elem.value = `${data[i]}`;
    elem.innerText = data[i];
    elem.onclick = () => getSectionData(`${data[i]}`);
    sectionBtn.appendChild(elem);
  }
};

const createTable = (data) => {
  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement("td");
    elem.innerText = data[i];
    tr1.appendChild(elem);
  }
};

class StarWarsConstructor {
  constructor(data) {
    this.data = data;
    this.count = data.count;
    this.results = data.results;
    this.next = data.next;
    console.log(this.data);
    console.log(this.count);
    console.log(this.results);
    console.log(this.next);
    const actors = this.results.map((actor) => actor.name);
    console.log(actors);
    createTable(actors);
  }
}
