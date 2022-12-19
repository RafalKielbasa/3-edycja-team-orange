const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: introduceYourself,
    getFavouriteColor: getFavouriteColor,
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
    nickname: "Tamazo",
    introduceYourself: introduceYourself,
    getFavouriteColor: getFavouriteColor,
  },
  {
    firstName: "Marcelina",
    lastName: "Lalanazw",
    nickname: "Aaanick",
  },
  {
    firstName: "Bartek",
    lastName: "Bartoszewicz",
    nickname: "Rabarbar",
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
      (this.firstName.length +
        this.lastName.length +
        this.nickname.length -
        number) %
      colors.length;
    console.log(colors[index]);
    return;
  }
}
let resultAbcde = people
  .filter(filterByNames)
  .map(reverse)
  .reduce(toObject, {});

function filterByNames(person) {
  lastLetterOfFirstName = person.firstName[person.firstName.length - 1];
  isElite = Math.floor(Math.random() * 101);
  if (isPrime(isElite) === true || (isElite % 3 === 0 && isElite % 5 === 0)) {
    return (isElite = true);
  } else {
    isElite = false;
  }
  return (
    isElite === true ||
    ((lastLetterOfFirstName === "a" || lastLetterOfFirstName === "k") &&
      person.lastName.length > 6 &&
      (person.nickname.includes("a") || person.nickname.includes("A")))
  );
}

function isPrime(number) {
  if (number === 0 || number === 1) {
    return false;
  } else {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }
}

function reverse(person) {
  let reversedPerson = {};
  let i = 0;
  for (let key in person) {
    reversedPerson = { ...reversedPerson, [person[key]]: key };
    if (i === 2) {
      return reversedPerson;
    }
    i++;
  }
}
function toObject(acc, person) {
  const { ...personEntries } = person;
  const { ...accEntries } = acc;
  return { ...accEntries, ...personEntries };
}

// *f) odtwórz z obiektu tablicę, która będzie zawierała same nicknames i nazwiska, ktdjest < s
// - pomijam "ktdjest < s" i zwrócę po prostu nicknames i nazwiska
names = [];
for (const [key, value] of Object.entries(resultAbcde)) {
  if (value === "nickname" || value === "lastName") {
    names.push(key);
  }
  if (value === "firstName") {
    for (let letter of key) {
      if (letter >= "s") {
        names.push(key);
        break;
      }
    }
  }
}
console.log("wynik po wykonaniu poleceń a-e", resultAbcde);
console.log("wynik f-g", names.sort());
