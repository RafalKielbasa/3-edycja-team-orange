const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",

    introduceYourself: function () {
      const message = `Cześć jestem ${this.firstName} ${this.lastName} , ale w szkole mówią na mnie ${this.nickname}`;
      console.log(message);
    },
  },
];
people[0].introduceYourself();

people.forEach((person) => {
  person.introduceYourself();
});
