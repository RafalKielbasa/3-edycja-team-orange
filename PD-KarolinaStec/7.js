const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
let names = [];
function getNames(object) {
  let currentName;
  for (let [key, value] of Object.entries(object)) {
    if (key === "name") {
      currentName = value;
    } else if (key === "name2") {
      currentName += " " + value;
    } else if (key === "name3") {
      currentName += " " + value;
    } else if (key === "children") {
      for (i = 0; i < value.length; i++) {
        getNames(value[i]);
      }
    }
  }
  names.push(currentName);
}
getNames(nestedObject);
console.log(names);
