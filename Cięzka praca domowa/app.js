const api = "https://swapi.dev/api/";
const container = document.getElementById("header");

const data = fetch(api)
  .then((response) => response.json())
  .then((data) => {
    Object.entries(data).forEach((item) => {
      const button = document.createElement("button");
      button.addEventListener("click", async () => {
        const response = await fetch(item[1]);
        const data = await response.json();
        console.clear();
        console.log(data);
      });

      container.appendChild(button);
      button.innerText = item[0].toUpperCase();
    });
  });
