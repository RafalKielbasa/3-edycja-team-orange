// const fetchData1Btn = document.getElementById("dane1");
// const fetchData2Btn = document.getElementById("dane2");
// const fetchData3Btn = document.getElementById("dane3");
// const fetchData4Btn = document.getElementById("dane4");
// const fetchData5Btn = document.getElementById("dane5");
const fetchData6Btn = document.getElementById("dane6");
// const fetchBaseUrlBtn = document.getElementById("BASE_URL");

// fetchData1Btn.addEventListener("click", async () => {
//   console.log("films");
//   await fetchData1();
// });
// fetchData2Btn.addEventListener("click", async () => {
//   console.log("people");
//   await fetchData2();
// });
// fetchData3Btn.addEventListener("click", async () => {
//   console.log("planets");
//   await fetchData3();
// });
// fetchData4Btn.addEventListener("click", async () => {
//   console.log("species");
//   await fetchData4();
// });
// fetchData5Btn.addEventListener("click", async () => {
//   console.log("starships");
//   await fetchData5();
// });
fetchData6Btn.addEventListener("click", async () => {
  await getVehicles();
  printVehicles();
});
// fetchBaseUrlBtn.addEventListener("click", async () => {
//   console.log("BASE_URL");
//   await fetchBaseUrl();
// });

const URL = `https://swapi.dev/api/`;

// async function fetchBaseUrl() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   console.log(`fetchData`, response);
// }
// async function fetchData1() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const filmsResponce = await fetch(response.films);
//   const films = await filmsResponce.json();
//   console.log(`films`, films);
// }
// async function fetchData2() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const peopleResponce = await fetch(response.people);
//   const people = await peopleResponce.json();
//   console.log(`people`, people);
// }
// async function fetchData3() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const planetsResponce = await fetch(response.planets);
//   const planets = await planetsResponce.json();
//   console.log(`planets`, planets);
// }
// async function fetchData4() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const speciesResponce = await fetch(response.species);
//   const species = await speciesResponce.json();
//   console.log(`species`, species);
// }
// async function fetchData5() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const starshipsResponce = await fetch(response.starships);
//   const starships = await starshipsResponce.json();
//   console.log(`starships`, starships);
// }
// async function fetchData6() {
//   const data = await fetch(`https://swapi.dev/api/`);
//   const response = await data.json();
//   const vehiclesResponce = await fetch(response.vehicles);
//   const vehicles = await vehiclesResponce.json();
//   console.log(`vehicles`, vehicles);
// }
// document.body.onload = addElement;

// async function addElement() {
//   const newDiv = document.createElement(`li`);
//   // const newContent = vehicles;
//   const newContent = document.createTextNode(`Hi all`);
//   newDiv.appendChild(newContent);
//   const currentDiv = document.getElementById(`div1`);
//   document.body.insertBefore(newDiv, currentDiv);
// }
const vehicles = [];
async function getVehicles() {
  const response = await fetch(`${URL}/vehicles`);
  const data = await response.json();
  vehicles.push(data);
}
async function printVehicles() {
  await getVehicles();
  const $vehiclesList = document.getElementById("vehicles");
  const $list = document.createElement("ul");
  vehicles.map((user) => {
    user.results.map((result) => {
      const $result = document.createElement("li");
      $result.innerHTML = result.name;
      $list.appendChild($result);
    });
  });
  $vehiclesList.appendChild($list);
}
// (async function main() {
//   await getVehicles();
//   printVehicles();
// })();
