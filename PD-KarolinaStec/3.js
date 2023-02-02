const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: introduceYourself,
  },
];
function introduceYourself() {
  return console.log(
    `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
  );
}
const colors = ["red", "green", "yellow", "blue", "pink", "orange"];
function getFavouriteColor(number) {
  if (number === undefined) {
    number = 5;
  }
  if (number < 1) {
    console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number > 30) {
    console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  } else {
    let index =
      Math.abs(
        this.firstName.length +
          this.lastName.length +
          this.nickname.length -
          number
      ) % colors.length;
    console.log(colors[index]);
    return;
  }
}
for (i = 0; i < people.length; i++) {
  people[i].getFavouriteColor = getFavouriteColor;
}
people[0].getFavouriteColor();
// people[0].getFavouriteColor(30);
