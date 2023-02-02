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
function introduceYourself() {
  return console.log(
    `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
  );
}
for (i = 0; i < people.length; i++) {
  people[i].introduceYourself = introduceYourself;
}
people.forEach((person) => person.introduceYourself());
