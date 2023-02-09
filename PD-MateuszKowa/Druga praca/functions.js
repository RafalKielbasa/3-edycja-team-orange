import { person, planet, film, specie, vehicle, starship } from "./classes.js";
import { confMessage, divTable, state } from "./scripver2.js";
let instance = null;
export let idToRemove = null;

export async function createInstance(instanceValue, dataCollection) {
  if (divTable.firstChild) {
    divTable.removeChild(divTable.firstElementChild);
  }
  const table = document.createElement("table");
  divTable.appendChild(table);
  switch (instanceValue) {
    case "people":
      instance = dataCollection.results.map(
        ({ edited, created, url, name, skin_color, height, mass }) =>
          new person(edited, created, url, name, skin_color, height, mass)
      );
      break;
    case "planets":
      instance = dataCollection.results.map(
        ({ edited, created, url, name, climate, population }) =>
          new planet(edited, created, url, name, climate, population)
      );
      break;
    case "films":
      instance = dataCollection.results.map(
        ({ edited, created, url, title, episode_id, release_date }) =>
          new film(edited, created, url, title, episode_id, release_date)
      );
      break;
    case "species":
      instance = dataCollection.results.map(
        ({ edited, created, url, name, language, designation }) =>
          new specie(edited, created, url, name, language, designation)
      );
      break;
    case "vehicles":
      instance = dataCollection.results.map(
        ({ edited, created, url, name, crew, model }) =>
          new vehicle(edited, created, url, name, crew, model)
      );
      break;
    case "starships":
      instance = dataCollection.results.map(
        ({ edited, created, url, name, crew, model }) =>
          new starship(edited, created, url, name, crew, model)
      );
      break;

    default:
      console.log(`Sorry value has no collection`);
  }

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const theadTr = document.createElement("tr");
  const thId = document.createElement("th");
  thId.innerHTML = "LP";
  theadTr.appendChild(thId);
  thead.appendChild(theadTr);
  table.appendChild(thead);
  Object.keys(instance[0])?.forEach((key) => {
    const thId = document.createElement("th");
    thId.innerHTML = key;
    theadTr.appendChild(thId);
    thead.appendChild(theadTr);
    table.appendChild(thead);
  });
  instance.forEach((value) => {
    const { url } = value;
    const lpIndex = url.split("/");
    const tr = document.createElement("tr");
    tr.id = `${lpIndex[4]}-${lpIndex[5]}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    const detailsBtn = document.createElement("button");
    detailsBtn.innerHTML = "DETAILS";
    const checkInput = document.createElement("INPUT");
    checkInput.setAttribute("type", "checkbox");
    checkInput.id = `${lpIndex[4]}-${lpIndex[5]}-checkInput`;
    checkInput.onchange = deleteFewRows;
    const tdId = document.createElement("td");
    tdId.innerHTML = lpIndex[5];
    tr.appendChild(tdId);
    Object.entries(value).forEach(([k, v]) => {
      const td = document.createElement("td");
      if (k === "edited" || k === "created") {
        td.innerHTML = v.split("T")[0];
        td.id = k;
      } else {
        td.innerHTML = v;
        td.id = k;
      }
      tr.appendChild(td);
    });
    tr.appendChild(deleteBtn);
    tr.appendChild(detailsBtn);
    tr.appendChild(checkInput);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    deleteBtn.onclick = showAlertAndTakeId;
  });
}
const showAlertAndTakeId = (event) => {
  idToRemove = event.target.parentElement.id;
  confMessage.style.display = "block";
};
const deleteFewRows = (event) => {
  const checkedInput = event.target;
  const idToRemoveMRows = event.target.parentElement.id;
  console.log(checkedInput.checked);
  const { rowsToDelete } = state;
  if (checkedInput.checked === true && !rowsToDelete.includes(idToRemoveMRows)) {
    rowsToDelete.push(idToRemoveMRows);
    console.log({ state });
  }
  if (checkedInput.checked === false && rowsToDelete.includes(idToRemoveMRows)) {
    const index = rowsToDelete.indexOf(idToRemoveMRows);
    rowsToDelete.splice(index, 1);
    console.log({ state });
  }
};
export const searchResult = () => {
  const children = divTable.childNodes[0].childNodes[1].childNodes;
  if (state.searchValue === "power") {
    window.open("https://www.youtube.com/watch?v=kNS4t5UCBfI");
  }
  children.forEach((value) => {
    if (!value.innerText.toLowerCase().includes(state.searchValue)) {
      value.style.display = "none";
    }
  });
};
