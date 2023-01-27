const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
];

function makeNickname(firstName, lastName) {
  const threeLettersOfName = firstName.slice(0, 3).split("").reverse().join("");
  const threeLettersOfLastName = lastName
    .slice(-3)
    .split("")
    .reverse()
    .join("");
  const nickName = [threeLettersOfName, threeLettersOfLastName].join("");
  return nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase();
}

const peopleNickNames = people.map((person) => {
  return {
    firstName: person.firstName,
    lastName: person.lastName,
    nickname: makeNickname(person.firstName, person.lastName),
  };
});

console.log(peopleNickNames);
