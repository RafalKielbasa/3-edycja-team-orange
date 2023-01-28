const api = 'https://swapi.dev/api/';
const container = document.getElementById('container');

const result = fetch(api).then((response) =>
  response.json().then((item) => {
    createButtons(item);
    getData(item);
  })
);

function createButtons(data) {
  Object.entries(data).forEach((item) => {
    const button = document.createElement('button');

    button.addEventListener('click', async () => {
      const response = await fetch(item[1]);
      const data = await response.json();
      console.clear();
      console.log(data);
    });

    header.appendChild(button);
    button.innerText = item[0].toUpperCase();
  });
}

class Peolpe {
  constructor(name, height, mass, gender) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
  }
}

async function getData(data) {
  const peopleResponse = await fetch(data.people);
  const peopleData = await peopleResponse.json();
  peopleData.results.forEach((item) => {
    const hero = new Peolpe(item.name, item.height, item.mass, item.gender);
  });
}
