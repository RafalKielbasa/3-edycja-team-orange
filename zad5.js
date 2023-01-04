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
    firstName: "Kasia",
    lastName: "Kowalska",
    nickname: "Sakaks",
    introduceYourself: introduceYourself,
    getFavouriteColor: getFavouriteColor,
  },
  {
    firstName: "Jack",
    lastName: "Payne",
    nickname: "Cajeny",
    introduceYourself: introduceYourself,
    getFavouriteColor: getFavouriteColor,
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

function introduceYourself() {
  return console.log(
    `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
  );
}

const randomNum = Math.floor(Math.random() * 101);

function isElite(num) {
  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  if (isPrime(num) == true) {
    return true;
  } else if (num % 3 == 0 && num % 5 == 0) {
    return true;
  }
  return false;
}

const newPeople = people
  .filter((person) => {
    if (isElite(randomNum) == true) {
      return person;
    } else if (
      person.firstName.slice(-1) == "a" ||
      (person.firstName.slice(-1) == "k" &&
        person.lastName.length > 6 &&
        person.nickname.includes("a"))
    ) {
      return person;
    }
  })
  .map((person) => {
    for (let key in person) {
      if (typeof person[key] == "string") {
        return { [person[key]]: key };
      }
    }
  })
  .reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});

console.log(newPeople);
