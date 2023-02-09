const URL = "http://localhost:3000";

const state = {
  users: [],
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

(async function main() {
  await getUsers();
  printUsers();
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
