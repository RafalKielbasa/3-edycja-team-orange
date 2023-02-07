const URL = "http://localhost:3000";
const SWAPI_URL = "https://swapi.dev/api/";
const state = {
  context: null,
  users: [],
  buttons: null,
  swapiData: {},
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function onRegister(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (!validateEmail(email)) {
    alert("email jest niepoprawny");
  }

  if (password !== repeatPassword) {
    alert("hasła się nie zgadzają");
    return;
  }

  fetch(`${URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  console.log("event", email, password, repeatPassword);
}

async function getUsers() {
  const response = await fetch(`${URL}/users`);
  const data = await response.json();
  state.users = data;
}

function printUsers() {
  const $usersList = document.getElementById("users");
  const $list = document.createElement("ul");
  state.users.forEach((user) => {
    const $user = document.createElement("li");
    $user.innerHTML = user.email;
    $list.appendChild($user);
  });

  $usersList.appendChild($list);
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function printButtons() {
  if (!state.buttons) {
    console.log("nie ma żadnych buttonów");
    return;
  }
  const buttons = document.getElementById("buttons");

  Object.entries(state.buttons).forEach(([key, value]) => {
    const button = document.createElement("button");
    button.id = key;
    button.innerHTML = key;
    button.addEventListener("click", async function () {
      const data = await fetchData(value);
      state.swapiData = {
        ...state.swapiData,
        [key]: data,
      };

      setActiveButton(this, key);
      state.context = key;
      printItems();
      console.log("state", state);
    });

    buttons.appendChild(button);
  });
}

function setActiveButton(button) {
  if (state.context) {
    const prevActiveButton = document.getElementById(state.context);
    prevActiveButton.style.background = "";
  }
  button.style.background = "green";
}

function printItems() {
  if (!state.context) {
    return;
  }

  const list = document.getElementById("list");
  list.innerHTML = "";
  const table = document.createElement("table");
  list.appendChild(table);
  const thead = document.createElement("thead");
  table.appendChild(thead);
  const trHead = document.createElement("tr");
  thead.appendChild(trHead);

  Object.keys(state.swapiData[state.context].results[0]).forEach((key) => {
    const th = document.createElement("th");
    th.innerHTML = key;
    trHead.appendChild(th);
  });

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  state.swapiData[state.context].results.forEach((item) => {
    const trBody = document.createElement("tr");
    Object.values(item).forEach((value) => {
      const td = document.createElement("td");

      if (value instanceof Array) {
        const select = printSelect(value);
        td.appendChild(select);
      } else {
        td.innerHTML = value;
      }

      trBody.appendChild(td);
    });
    tbody.appendChild(trBody);
  });
}

function printSelect(urls) {
  const select = document.createElement("select");
  select.value = "";
  urls.forEach((url) => {
    const option = document.createElement("option");
    option.innerHTML = url;
    option.value = url;
    select.appendChild(option);
  });

  console.log("sel", select);

  return select;
}

(async function main() {
  await getUsers();
  printUsers();
  const buttons = await fetchData(SWAPI_URL);
  state.buttons = buttons;
  printButtons();
})();

//   fetch(`${URL}/users/${id}`, {
//     method: "DELETE",
//   });

// fetch(`${URL}/users/${id}`, {
//   method: "PUT",

//   body: {
//     email,
//     password,
//   },
// });

// fetch(`${URL}/users/${id}`, {
//   method: "PATCH",

//   body: {
//     email,
//   },
// });

// TODO: sprawdzcie różnicę między PATCH i PUT
