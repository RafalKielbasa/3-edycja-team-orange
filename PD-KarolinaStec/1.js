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
    firstName: "Al",
    lastName: "Loza-Le",
  },
];

const peopleWithNicknames = people.map(function addNickname({
  firstName,
  lastName,
}) {
  return {
    firstName,
    lastName,
    nickname: createNickname({ firstName, lastName }),
  };
});

function createNickname({ firstName, lastName }) {
  let nick1 = firstName.slice(0, 3).split("").reverse().join("");
  let nick2 = lastName[lastName.length - 1];
  loop: for (i = 2; i <= 3 && i < lastName.length + 1; i++) {
    if (isLetter(lastName[[lastName.length - i]])) {
      nick2 = lastName[lastName.length - i] + nick2;
    } else {
      nick2 = lastName[lastName.length - i - 1] + nick2;
      break loop;
    }
  }
  nick2 = nick2.split("").reverse().join("");
  let nick = (nick1 + nick2).toLowerCase();
  return nick.charAt(0).toUpperCase() + nick.slice(1);
}
function isLetter(a) {
  return a.toLowerCase() != a.toUpperCase();
}
console.log(peopleWithNicknames);
