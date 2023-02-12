import { person, planet, film, specie, vehicle, starship } from "./classes.js";
import { confMessage, divTable, state } from "./scripver2.js";
let instance = null;
export let idToRemove = null;

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
