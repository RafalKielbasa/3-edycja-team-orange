const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    favouriteColor: function (number) {
      const stringSum =
        this.firstName.length + this.lastName.length + this.nickname.length;

      const whatColor = (stringSum - number) % colors.length;

      if (number == null) {
        console.log(colors[5]);
      } else if (number < 1) {
        console.log(
          "Podałeś/łaś za małą liczbę, liczba nie może być mniejsza niż 1"
        );
      } else if (number > 30) {
        console.log(
          "Podałeś/łaś za dużą liczbę, liczba nie może być większa niż 30"
        );
      } else {
        console.log(colors[whatColor]);
      }
    },
  },
];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

people[0].favouriteColor();
