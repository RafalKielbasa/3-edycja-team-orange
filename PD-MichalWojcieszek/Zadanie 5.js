const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself() {},
    getFavouriteColor() {},
  },
  {
    firstName: "Michal",
    lastName: "Wojcieszek",
    nickname: "Mike",
    introduceYourself() {},
    getFavouriteColor() {},
  },
  {
    firstName: "Rob",
    lastName: "Halford",
    nickname: "Robbie",
  },
  {
    firstName: "Paulina",
    lastName: "Kowalska",
    nickname: "Polina",
  },
  {
    firstName: "Kazik",
    lastName: "Nowakowski",
    nickname: "Kaziu",
  },
];

const isElite = Math.floor(Math.random() * 100);
const isElitePrime = (isElite) => {
  if (isElite % 3 == 0 && isElite % 5 == 0) {
    return true;
  }
  if (isElite < 2) {
    return false;
  }
  if (isElite == 2 || isElite == 3) {
    return true;
  }
  const number = Math.ceil(isElite);
  for (let i = 2; i <= number; i++) {
    if (isElite % i == 0) {
      return false;
    }
  }
  return true;
};
console.log(isElite);
console.log(`Liczba podzielna przez 3 i 5 ?`, isElitePrime(isElite));

let chain = people.filter(filtring).map(mapping).reduce(reducing);

function filtring(object) {
  const result = isElitePrime(isElite);
  if (result === false)
    return (
      (object.firstName[object.firstName.length - 1] === `a` ||
        object.firstName[object.firstName.length - 1] === `k`) &&
      object.lastName.length > 6 &&
      object.nickname.includes("a")
    );
  return object;
}

function mapping(item) {
  let reversedPerson = {};
  let i = 0;

  for (let key in item) {
    reversedPerson = {
      ...reversedPerson,
      [item[key]]: key,
    };
    if (i === 2) {
      console.log(reversedPerson);
      return reversedPerson;
    }
    i++;
  }
}

function reducing(acc, item) {
  return {
    ...acc,
    ...item,
  };
}
console.log(chain);
