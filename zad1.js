const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
  {
    firstName: "Pablo",
    lastName: "J",
  },
  {
    firstName: "Cj",
    lastName: "Mbappe",
  },
];

function createNickName(firstName, lastName) {
  const threeCharsOfName = firstName.slice(0, 3).split("").reverse().join("");
  const threeCharsOfLastName = lastName.slice(-3).split("").reverse().join("");

  const nickName = [threeCharsOfName, threeCharsOfLastName].join("");
  return nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase();
}

const peopleWithNickNames = people.map((person) => {
  return {
    fistName: person.firstName,
    lastName: person.lastName,
    nickname: createNickName(person.firstName, person.lastName),
  };
});

console.log(peopleWithNickNames);
