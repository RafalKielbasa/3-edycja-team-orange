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

function nameRecursion(arr) {
  let nameInArr;

  for (const [key, value] of Object.entries(arr)) {
    if (key == "name") {
      nameInArr = value;
    } else if (key == "name2" || key == "name3") {
      nameInArr += " " + value;
    } else if (key == "children") {
      for (let i = 0; i < value.length; i++) {
        nameRecursion(value[i]);
      }
    }
  }
  +names.push(nameInArr);
}

nameRecursion(nestedObject);
console.log(names);
