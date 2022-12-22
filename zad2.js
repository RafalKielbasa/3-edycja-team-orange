const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: function () {
      console.log(
        `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickname}`
      );
    },
  },
];

people[0].introduceYourself();

//b

const introduceYourself = people.forEach((person) => {
  people.introduceYourself();
});

console.log(introduceYourself);
