const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    getFavouriteColour: function (number) {
     const colours = ["red", "green", "yellow", "blue", "pink", "orange"];
     const Suma =
        this.firstName.length + this.lastName.length + this.nickname.length;
      const Colour = (Suma - number) % colours.length;
      if (number > 30) {
        console.log(
          "Podałeś za dużą liczbę, liczba nie może być większa niż 30"
        );
      }
      if (number < 1) {
        console.log(
          "Podałeś za małą liczbę, liczba nie może być mniejsza niż 1"
        );
      } else if (number === undefined) 
      console.log(colours[5]);
    },
  },
];

people[0].getFavouriteColour();