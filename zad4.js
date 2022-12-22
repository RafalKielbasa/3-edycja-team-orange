const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
    nickname: "Tamazo",
  },
];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

function getFavouriteColor(person, number) {
  const stringSum =
    person.firstName.length + person.lastName.length + person.nickname.length;

  const whatColor = (stringSum - number) % colors.length;

  if (number == null) {
    return colors[5];
  } else if (number < 1) {
    return "Podałeś/łaś za małą liczbę, liczba nie może być mniejsza niż 1";
  } else if (number > 30) {
    return "Podałeś/łaś za dużą liczbę, liczba nie może być większa niż 30";
  } else {
    return colors[whatColor];
  }
}

for (const i of people) {
  console.log(getFavouriteColor(i, 5));
}
