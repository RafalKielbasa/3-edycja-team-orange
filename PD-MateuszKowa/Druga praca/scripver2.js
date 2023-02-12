export const divTable = document.getElementById("table");
const pageNumberInput = document.getElementById("pageNumber");
export const confMessage = document.getElementById("deleteCnf");
const nextBtn = document.getElementById("nextBtn");
const prevtBtn = document.getElementById("prevBtn");
const pagination = document.getElementById("pagination");
const multiDelete = document.getElementById("deleteFewRows");
const find = document.getElementById("find");
const searchBtn = document.getElementById("search");

const szukaj = document.getElementById("szukaj");

const endpointInput = document.createElement("input");

searchValue.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  state.searchValue = value;
});

async function app() {
  try {
    await fetchData(BASE_URL, "api");
    Object.keys(state.api)?.map((key) => {
      const button = document.createElement("button");

      button.innerHTML = key;
      buttons.appendChild(button);
      select.style.display = "block";
    });
    buttons.appendChild(endpointInput);
    nextBtn.onclick = nextPage;
    prevtBtn.onclick = prevPage;

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
  pagination.style.display = "block";
  find.style.display = "block";
}

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
