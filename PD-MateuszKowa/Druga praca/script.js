window.onload = app;
import { person, planet, film, specie, vehicle, starship } from "./classes.js";
let BASE_URL = "https://swapi.dev/api/";
let apiCollection;
export let state = {
  pageNmb: 1,
  rowsToDelete: [],
  itemsNumberOnPage: 10,
  endpointSelected: "people",
  idToDetail: 0,
  used: 0,
  ActiveBtn: 0,
  prevActBtn: null,
  clicked: 0,
};
const $buttons = document.getElementById("buttons");
const $itemsNumberOnPage = document.getElementById("itemsNumberOnPage");
const $endpointInput = document.getElementById("endpointInput");
const $endpointsSelector = document.getElementById("endpointsSelector");
const $pageNumberInput = document.getElementById("pageNumber");
const $availableSearchFields = document.getElementById("availableSearchFields");
const $endpointSearchBtn = document.getElementById("endpointSearchBtn");
const $tableWithData = document.getElementById("tableWithData");
const body = document.body;
const audioFile = new Audio("Audiomachine - Leap of Faith.mp3");
const $deleteManyRows = document.getElementById("deleteManyRows");
const $deleteCnf = document.getElementById("deleteCnf");
const $backBtn = document.getElementById("backBtn");
const $confirmBtn = document.getElementById("confirmBtn");
const $pagination = document.getElementById("pagination");
const $nextBtn = document.getElementById("nextBtn");
const $prevtBtn = document.getElementById("prevBtn");
const $choosePage = document.getElementById("choosePage");
const $maxPageNmbr = document.getElementById("maxPageNmbr");
const $SearchThrouTable = document.getElementById("SearchThrouTable");
const $searchedValue = document.getElementById("searchedValue");
const $searchInTable = document.getElementById("searchInTable");
const $ShowAll = document.getElementById("ShowAll");
const $details = document.getElementById("details");
export const $detailStart = document.getElementById("detailStart");
export const $detailStop = document.getElementById("detailStop");
export const $detailResult = document.getElementById("detailResult");
const $detailsActiveBtnValues = document.getElementById("detailsActiveBtnValues");
async function app() {
  try {
    await fetchData(BASE_URL, "api");
    Object.keys(state?.api).map((key) => {
      const $button = document.createElement("button");
      $button.onclick = buttonClick;
      $button.innerHTML = key;
      $button.id = key;
      $button.classList.add("mainAppBtn");
      $buttons.appendChild($button);
      const $option = document.createElement("option");
      $option.innerHTML = key;
      $endpointsSelector.appendChild($option);
    });
    document.querySelector(".overlay").classList.remove("active");
    $endpointSearchBtn.onclick = endpointSearcher;
    $deleteManyRows.onclick = deleteMany;
    $backBtn.onclick = hideAlert;
    $confirmBtn.onclick = deleteRow;
    $nextBtn.onclick = nextPage;
    $prevtBtn.onclick = prevPage;
    $choosePage.onclick = choosePage;
    $searchInTable.onclick = searchResult;
    $ShowAll.onclick = showAllRows;
  } catch (error) {
    console.log("Wystąpił błąd: " + error);
  }
}
async function fetchData(url, stateKey) {
  try {
    document.querySelector(".overlay").classList.add("active");
    const response = await fetch(url);
    apiCollection = await response.json();
    state[stateKey] = apiCollection;
    if (apiCollection.next) {
      $nextBtn.disabled = !apiCollection.next;
      console.log(apiCollection.next);
    } else {
      $nextBtn.disabled = true;
    }
    if (apiCollection.previous) {
      $prevtBtn.disabled = !apiCollection.previous;
    } else {
      $prevtBtn.disabled = true;
    }
    console.log({ state });
  } catch (error) {
    console.log("Wystąpił błąd: " + error);
  }
}
$itemsNumberOnPage?.addEventListener("change", () => {
  state.itemsNumberOnPage = Number($itemsNumberOnPage.value);
});
$endpointsSelector?.addEventListener("change", () => {
  state.endpointSelected = $endpointsSelector.value;
  const { endpointSelected } = state;
  switch (endpointSelected) {
    case "people":
      $availableSearchFields.innerHTML = "name";
      break;
    case "planets":
      $availableSearchFields.innerHTML = "name";
      break;
    case "films":
      $availableSearchFields.innerHTML = "title";
      break;
    case "species":
      $availableSearchFields.innerHTML = "name";
      break;
    case "vehicles":
      $availableSearchFields.innerHTML = "name/model";
      break;
    case "starships":
      $availableSearchFields.innerHTML = "name/model";
      break;

    default:
      console.log(`Sorry no value`);
  }
});
function debounce(cb, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
$endpointInput?.addEventListener(
  "input",
  debounce((e) => {
    const value = e.target.value.toLowerCase();
    state.endpointInput = value;
    $endpointSearchBtn.disabled = false;
  }, 300)
);
$pageNumberInput?.addEventListener("input", (e) => {
  const value = e.target.value;
  state.pageNmb = value;
});
async function buttonClick(event) {
  if (state.idToDetail != 0) {
    state.idToDetail = 0;
    $tableWithData.childNodes[1].remove();
  }
  if (state.clicked > 0) {
    state.prevActBtn = state.ActiveBtn;
    const { prevActBtn } = state;
    const prevBtntoHide = document.getElementById(prevActBtn);
    prevBtntoHide.classList.remove("active");
  }

  $deleteManyRows.style.display = "none";
  const buttonValue = event.target.innerHTML;
  const activeBtnShow = document.getElementById(buttonValue);
  activeBtnShow.classList.add("active");
  state.ActiveBtn = buttonValue;
  const { api } = state;
  const { ActiveBtn, itemsNumberOnPage } = state;
  await fetchData(api[buttonValue], ActiveBtn);
  await createClass(ActiveBtn, state[ActiveBtn]);
  document.querySelector(".overlay").classList.remove("active");
  state.used = 0;
  state.pageNmb = 1;
  $pageNumberInput.value = state.pageNmb;
  const valueMax = Math.ceil(state[ActiveBtn].count / itemsNumberOnPage);
  state.maxPgNmb = valueMax;
  $maxPageNmbr.innerHTML = valueMax;
  state.clicked++;
}
const endpointSearcher = async () => {
  if (state.idToDetail != 0) {
    state.idToDetail = 0;
    $tableWithData.childNodes[1].remove();
  }
  await fetchData(
    `${BASE_URL}${state.endpointSelected}?search=${state.endpointInput}`,
    state.endpointSelected
  );
  document.querySelector(".overlay").classList.remove("active");
  const { endpointSelected } = state;
  state.pageNmb = 1;
  createClass(endpointSelected, state[endpointSelected]);
  state.used = 1;
  $pagination.classList.remove("active");
};
async function createClass(instanceValue, dataCollection) {
  let instance;
  switch (instanceValue) {
    case "people":
      instance = dataCollection.results.map((value) => new person({ ...value }));
      break;
    case "planets":
      instance = dataCollection.results.map((value) => new planet({ ...value }));
      break;
    case "films":
      instance = dataCollection.results.map((value) => new film({ ...value }));
      break;
    case "species":
      instance = dataCollection.results.map((value) => new specie({ ...value }));
      break;
    case "vehicles":
      instance = dataCollection.results.map((value) => new vehicle({ ...value }));
      break;
    case "starships":
      instance = dataCollection.results.map((value) => new starship({ ...value }));
      break;

    default:
      console.log(`Sorry value has no collection`);
  }
  state.changedToClass = instance;
  const { ActiveBtn } = state;
  createAndShowTable(instance);
  $details.classList.add("active");
  const objectToGetNames = Object.values(instance);
  if (ActiveBtn) {
    removeOptions($detailsActiveBtnValues);
    $detailResult.innerHTML = "";
  }
  objectToGetNames.forEach((value) => {
    const $optiontElement = document.createElement("option");
    if (ActiveBtn == "films") {
      $optiontElement.innerHTML = value.title;
      $optiontElement.value = value.title;
    } else {
      $optiontElement.innerHTML = value.name;
      $optiontElement.value = value.name;
    }
    $detailsActiveBtnValues.appendChild($optiontElement);
  });
  switch (ActiveBtn) {
    case "starships": {
      $detailStart.onclick = () => state.changedToClass[0].drive();
      $detailStop.onclick = () => state.changedToClass[0].stop();
      break;
    }
    case "planets": {
      $detailStart.onclick = () => state.changedToClass[0].compareToEarth();
      $detailStop.classList.add("details");
      break;
    }
    case "species": {
      $detailStart.onclick = () => state.changedToClass[0].HowLongYouWillLive();
      $detailStop.classList.add("details");
      break;
    }
    case "films": {
      $detailStart.onclick = () => state.changedToClass[0].showOpening();
      $detailStop.classList.add("details");
      break;
    }
    case "people": {
      $detailStart.onclick = () => state.changedToClass[0].yourBMI();
      $detailStop.classList.add("details");
      break;
    }
  }
}
function removeOptions(selectElement) {
  const L = selectElement.options.length - 1;
  for (let i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}
function createAndShowTable(dataToShow) {
  if ($tableWithData.firstChild) {
    $tableWithData.removeChild($tableWithData.firstElementChild);
  }
  $tableWithData.classList.add("defaultTable");
  const $table = document.createElement("table");
  $tableWithData.appendChild($table);
  createTH(dataToShow, $table);
  createOriginalTB(dataToShow, $table);
}
const deleteFewRows = (event) => {
  $deleteManyRows.style.display = "block";
  const checkedInput = event.target;
  const idToRemoveMRows = event.target.parentElement.id;
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
  if (rowsToDelete.length === 0) {
    $deleteManyRows.style.display = "none";
  }
};
const deleteMany = () => {
  const { rowsToDelete } = state;
  rowsToDelete.forEach((element) => {
    const elToRemove = document.getElementById(element);
    elToRemove.remove();
    $deleteManyRows.style.display = "none";
  });
};
const showAlertAndTakeId = (event) => {
  const idToRemove = event.target.parentElement.id;
  $deleteCnf.style.display = "block";
  state.singleIdToRemove = idToRemove;
};
const hideAlert = () => ($deleteCnf.style.display = "none");
const deleteRow = () => {
  const elToRemove = document.getElementById(state.singleIdToRemove);
  hideAlert();
  return elToRemove.remove();
};

const leapOfFaith = (event) => {
  const buttonKey = event.key;
  if (buttonKey === "q") {
    audioFile.play();
    audioFile.volume = 0.15;
  }
  if (buttonKey === "s") {
    audioFile.pause();
  }
};
body.addEventListener("keypress", leapOfFaith);
function createTH(data, tableName) {
  const $thead = document.createElement("thead");
  const $theadTr = document.createElement("tr");
  const $thId = document.createElement("th");
  $thId.innerHTML = "LP";
  $theadTr.appendChild($thId);
  $thead.appendChild($theadTr);
  tableName.appendChild($thead);
  Object.keys(data[0])
    .reverse()
    ?.forEach((key) => {
      const $thId = document.createElement("th");
      $thId.innerHTML = key;
      $theadTr.appendChild($thId);
      $thead.appendChild($theadTr);
      tableName.appendChild($thead);
    });
}
function createBtnAndInput(index, number, row) {
  const $deleteBtn = document.createElement("button");
  $deleteBtn.innerHTML = "DELETE";
  $deleteBtn.classList.add("delDetBtn");
  const $detailsBtn = document.createElement("button");
  $detailsBtn.innerHTML = "DETAILS";
  $detailsBtn.classList.add("delDetBtn");
  const $checkInput = document.createElement("INPUT");
  $checkInput.setAttribute("type", "checkbox");
  $checkInput.id = `${index[4]}-${number}-checkInput`;
  $checkInput.onchange = deleteFewRows;
  row.appendChild($deleteBtn);
  row.appendChild($detailsBtn);
  row.appendChild($checkInput);
  $deleteBtn.onclick = showAlertAndTakeId;
  $detailsBtn.onclick = createDetailTable;
}
function createOriginalTB(data, tableName) {
  const $tbody = document.createElement("tbody");
  let appropriatelength = state.itemsNumberOnPage;
  if (appropriatelength > data.length) {
    appropriatelength = data.length;
  }
  for (let i = 0; i < appropriatelength; i++) {
    const { pageNmb, itemsNumberOnPage } = state;
    let lpNumber = i + 1;
    if (pageNmb != 1) {
      lpNumber = i + 1 + (pageNmb - 1) * itemsNumberOnPage;
    }
    createDataCells(data, $tbody, lpNumber, i);
  }
  tableName.appendChild($tbody);
}
const createDetailTable = (event) => {
  if (state.idToDetail != 0) {
    const previousTable = document.getElementById("detailTabel");
    previousTable.remove();
  }
  const idToDetail = event.target.parentElement.id.split("-")[1];
  let indexNumber = idToDetail;
  if (Number(idToDetail) > 10) {
    indexNumber = idToDetail % 10;
  }
  const $detailTabel = document.createElement("table");
  state.idToDetail = Number(idToDetail);
  $tableWithData.appendChild($detailTabel);
  const $detailTbody = document.createElement("tbody");
  const { ActiveBtn, used, endpointSelected } = state;
  if (ActiveBtn != 0) {
    createTH(state[ActiveBtn].results, $detailTabel);
    createDataCells(state[ActiveBtn].results, $detailTbody, idToDetail, indexNumber - 1);
    state.used = 0;
  }
  if (used != 0) {
    createTH(state[endpointSelected].results, $detailTabel);
    createDataCells(state[endpointSelected].results, $detailTbody, idToDetail, indexNumber - 1);
    state.ActiveBtn = 0;
  }
  $detailTabel.appendChild($detailTbody);
  const $closeBtn = document.createElement("button");
  $closeBtn.innerHTML = "Close";
  $detailTabel.appendChild($closeBtn);
  $closeBtn.onclick = closeTable;
  function closeTable() {
    state.idToDetail = 0;
    $detailTabel.remove();
  }
  $detailTabel.id = "detailTabel";
  console.log({ state });
};
function createDataCells(data, tbodyName, number, dataIndex) {
  const { url } = data?.[dataIndex];
  const lpIndex = url.split("/");
  const $tr = document.createElement("tr");
  $tr.id = `${lpIndex[4]}-${number}`;
  const $tdId = document.createElement("td");
  $tdId.innerHTML = number;
  $tr.appendChild($tdId);
  const dataINeed = Object.entries(data?.[dataIndex]);
  dataINeed.reverse().forEach(([k, v]) => {
    const $td = document.createElement("td");
    if (Array.isArray(v)) {
      const $selectElement = document.createElement("select");
      $selectElement.value = "";
      v.forEach((op) => {
        const $optiontElement = document.createElement("option");
        $optiontElement.innerHTML = op;
        $optiontElement.value = op;
        $selectElement.appendChild($optiontElement);
      });
      $td.id = k;
      $td.appendChild($selectElement);
      $tr.appendChild($td);
    } else {
      $td.innerHTML = v;
      $td.id = k;
      $tr.appendChild($td);
    }
  });
  if (state.idToDetail == 0) {
    createBtnAndInput(lpIndex, number, $tr);
  }
  tbodyName.appendChild($tr);
  $pagination.classList.add("visible");
  $SearchThrouTable.classList.add("visible");
}
const nextPage = async () => {
  const { ActiveBtn } = state;
  const nextPageUrl = state[ActiveBtn].next;
  state.pageNmb++;
  $pageNumberInput.value = state.pageNmb;
  await fetchData(nextPageUrl, ActiveBtn);
  await createClass(ActiveBtn, state[ActiveBtn]);
  document.querySelector(".overlay").classList.remove("active");
};
const prevPage = async () => {
  const { ActiveBtn } = state;
  const prevPageUrl = state[ActiveBtn].previous;
  state.pageNmb--;
  $pageNumberInput.value = state.pageNmb;
  await fetchData(prevPageUrl, ActiveBtn);
  await createClass(ActiveBtn, state[ActiveBtn]);
  document.querySelector(".overlay").classList.remove("active");
};
const choosePage = async () => {
  const { ActiveBtn, maxPgNmb } = state;
  let { pageNmb } = state;
  if (pageNmb > maxPgNmb) {
    pageNmb = maxPgNmb;
    $pageNumberInput.value = maxPgNmb;
  }

  await fetchData(`${BASE_URL}${ActiveBtn}?page=${pageNmb}`, ActiveBtn);
  await createClass(ActiveBtn, state[ActiveBtn]);
  document.querySelector(".overlay").classList.remove("active");
};
$searchedValue.addEventListener(
  "input",
  debounce((e) => {
    const value = e.target.value.toLowerCase();
    state.searchValue = value;
  }),
  300
);
const searchResult = () => {
  $searchedValue.value = "";
  $ShowAll.disabled = false;
  const children = $tableWithData.childNodes[0].childNodes[1].childNodes;
  if (state.searchValue === "power") {
    window.open("https://www.youtube.com/watch?v=kNS4t5UCBfI");
  }
  children.forEach((value) => {
    if (!value.innerText.toLowerCase().includes(state.searchValue)) {
      value.classList.add("hideRow");
    }
  });
};
const showAllRows = () => {
  const children = $tableWithData.childNodes[0].childNodes[1].childNodes;
  children.forEach((value) => value.classList.remove("hideRow"));
};
