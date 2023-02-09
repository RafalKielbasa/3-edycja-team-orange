window.onload = app;
let BASE_URL = "https://swapi.dev/api/";
import { createInstance, idToRemove, searchResult } from "./functions.js";
export let state = {
  pageNmb: 1,
  rowsToDelete: [],
  itemsShowOnPage: 10,
};
let apiCollection;
export const divTable = document.getElementById("table");
const pageNumberInput = document.getElementById("pageNumber");
export const confMessage = document.getElementById("deleteCnf");
const backBtn = document.getElementById("backBtn");
const agreekBtn = document.getElementById("confirmBtn");
const nextBtn = document.getElementById("nextBtn");
const prevtBtn = document.getElementById("prevBtn");
const pagination = document.getElementById("pagination");
const multiDelete = document.getElementById("deleteFewRows");
const find = document.getElementById("find");
const searchBtn = document.getElementById("search");
const searchValue = document.getElementById("searchValue");
const szukaj = document.getElementById("szukaj");
const buttons = document.getElementById("app");
const endpointInput = document.createElement("input");
const body = document.body;
const audioFile = new Audio("Audiomachine - Leap of Faith.mp3");
const select = document.getElementById("itemsNumber");

pageNumberInput.addEventListener("input", (e) => {
  const value = e.target.value;
  state.pageNmb = value;
});
searchValue.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  state.searchValue = value;
});
endpointInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  state.endpointInput = value;
});
select.addEventListener("change", () => {
  state.itemsShowOnPage = select.value;
});
async function app() {
  try {
    await fetchData(BASE_URL, "api");
    Object.keys(state.api)?.map((key) => {
      const button = document.createElement("button");
      button.onclick = buttonClick;
      button.innerHTML = key;
      buttons.appendChild(button);
    });
    buttons.appendChild(endpointInput);
    nextBtn.onclick = nextPage;
    prevtBtn.onclick = prevPage;
    backBtn.onclick = hideAlert;
    agreekBtn.onclick = deleteRow;
    searchBtn.onclick = searchPage;
    multiDelete.onclick = deleteMany;
    szukaj.onclick = searchResult;
  } catch (error) {
    console.log("Wystąpił błąd: " + error);
  }
}
async function fetchData(url, stateKey) {
  try {
    const response = await fetch(url);
    apiCollection = await response.json();
    state[stateKey] = apiCollection;
    console.log({ state });
  } catch (error) {
    console.log("Wystąpił błąd: " + error);
  }
}
async function buttonClick(event) {
  state.pageNmb = 1;
  pageNumberInput.value = state.pageNmb;
  const buttonValue = event.target.innerHTML;
  state.ActiveBtn = buttonValue;
  const { api } = state;
  const { ActiveBtn } = state;
  if (state.endpointInput) {
    await fetchData(`${BASE_URL}${ActiveBtn}?search=${state.endpointInput}`, ActiveBtn);
    await createInstance(ActiveBtn, state[ActiveBtn]);
  } else {
    await fetchData(api[buttonValue], ActiveBtn);
    await createInstance(ActiveBtn, state[ActiveBtn]);
  }
  pagination.style.display = "block";
  find.style.display = "block";
}
const hideAlert = () => (confMessage.style.display = "none");
const deleteRow = () => {
  const elToRemove = document.getElementById(idToRemove);
  hideAlert();
  return elToRemove.remove();
};
const nextPage = async () => {
  const { ActiveBtn } = state;
  const nextPageUrl = state[ActiveBtn].next;
  if (nextPageUrl === null) {
    nextBtn.disabled = true;
  }
  state.pageNmb++;
  pageNumberInput.value = state.pageNmb;
  if ((prevtBtn.disabled = true)) {
    prevtBtn.disabled = false;
  }
  await fetchData(nextPageUrl, ActiveBtn);
  await createInstance(ActiveBtn, state[ActiveBtn]);
};
const prevPage = async () => {
  const { ActiveBtn } = state;
  const prevPageUrl = state[ActiveBtn].previous;
  if (prevPageUrl === null) {
    prevtBtn.disabled = true;
  }
  state.pageNmb--;
  pageNumberInput.value = state.pageNmb;
  if ((nextBtn.disabled = true)) {
    nextBtn.disabled = false;
  }
  await fetchData(prevPageUrl, ActiveBtn);
  await createInstance(ActiveBtn, state[ActiveBtn]);
};
const searchPage = async () => {
  const { ActiveBtn, pageNmb } = state;
  await fetchData(`${BASE_URL}${ActiveBtn}?page=${pageNmb}`, ActiveBtn);
  await createInstance(ActiveBtn, state[ActiveBtn]);
};
const deleteMany = () => {
  const { rowsToDelete } = state;
  rowsToDelete.forEach((element) => {
    const elToRemove = document.getElementById(element);
    return elToRemove.remove();
  });
};
const gameOver = (event) => {
  const buttonKey = event.key;
  console.log(buttonKey);
  if (buttonKey === "q") {
    audioFile.play();
    audioFile.volume = 0.15;
  }
  if (buttonKey === "s") {
    audioFile.pause();
  }
};
body.addEventListener("keypress", gameOver);
