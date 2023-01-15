//  ZADANIA WYKONANE !!!

const people1 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
  {
    firstName: "Piotrulo",
    lastName: "Kurzydymulo",
  },
  {
    firstName: "Kurt",
    lastName: "Cobain",
  },
  {
    firstName: "James",
    lastName: "Hetfield",
  },
];
const firstThreeLettersReversed = [];
const lastThreeLettersReversed = [];
const firstAndLastConnected = [];
const finalResult = [];
people1.map(function (nickname) {
  firstThreeLettersReversed.push(
    nickname.firstName.slice(0, 3).split("").reverse().join("")
  );
  lastThreeLettersReversed.push(
    nickname.lastName.slice(-3).split("").reverse().join("")
  );
  firstAndLastConnected.push(
    nickname.firstName.slice(0, 3).split("").reverse().join("") +
      nickname.lastName.slice(-3).split("").reverse().join("")
  );
  finalResult.push(
    (nickname.firstName.slice(0, 3).split("").reverse().join("") +
      nickname.lastName
        .slice(-3)
        .split("")
        .reverse()
        .join(""))[0].toUpperCase() +
      (
        nickname.firstName.slice(0, 3).split("").reverse().join("") +
        nickname.lastName.slice(-3).split("").reverse().join("")
      )
        .toLocaleLowerCase()
        .slice(1)
  );
});
console.log(`Zadanie 1.a)`);
console.log(`firstThreeLettersReversed:`, firstThreeLettersReversed);
console.log(`---`);
console.log(`Zadanie 1.b)`);
console.log(`lastThreeLettersReversed:`, lastThreeLettersReversed);
console.log(`firstAndLastConnected:`, firstAndLastConnected);
console.log(`---`);
console.log(`Zadanie 1.c)`);
console.log(`finalResult:`, finalResult);
console.log(`---`);

/* 
// 1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
// a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
// b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string do poprzedniego
// c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnych wielkich liter poza 1.
      d) Jeżeli liczba znaków w imieniu bądź nazwisku jest mniejsza niż 3, nickname będzie odpowiednio krótszy 
      e) rozważcie wszystkie skrajne przypadki, ponieważ Waszą funkcję mapującą wrzucimy do testów na platformie
      e) Have fun :)
      Na przykład:
      Dla osoby: 
      {
          firstName: 'Bartolomeo',
          lastName: 'Lozano'
      }
      powinniśmy uzyskać nickname Rabona
      Hints:
      - mając zmienną name = 'Bart'
        name.split('') => ['B', 'a', 'r', 't'] - tworzymy tablicę liter ze stringa
        ['B', 'a', 'r', 't'].join('') => 'Bart' - odwracamy ten proces
      - Na tablicy możemy użyć metody reverse()
      - Na stringach czy pojedynczych literkach możemy używać metod toLowerCase(), toUpperCase()
  */

const people2 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself,
  },
  {
    firstName: "Piotrulo",
    lastName: "Kurzydymulo",
    nickname: "Kurzy",
    introduceYourself,
  },
  {
    firstName: "James",
    lastName: "Hetfield",
    nickname: "Jaymz",
    introduceYourself,
  },
];
function introduceYourself() {
  console.log(
    `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`
  );
}
console.log(`Zadanie 2.a)`);
people2[2].introduceYourself();
console.log(`---`);
console.log(`Zadanie 2.b)`);
people2.forEach((item) => item.introduceYourself());
console.log(`---`);

/* 
//  DANE WEJŚCIOWE
// 2.
// a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.
// b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
// pojawić się tekst powitalny dla każdej osoby w tablicy
      Oczywiście tekst powinien wyświetlić się dopiero po wywołaniu funkcji.
      Dla powyższego przykładu tekst powinien wyglądać w następujący sposób:
      "Cześć jestem Bartolomeo Lozano, ale w szkole mówią na mnie [Rabona]"
      Natomiast wywołanie funkcji: people[0].introduceYourself()
      Obiekt z przykładu powinien wyglądać w ten sposób
      {
          firstName: "Bartolomeo",
          lastName: "Lozano",
          nickname: "Rabona",
          introduceYourself: // tutaj ma się znajdować funkcja
      },
      b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
      pojawić się tekst powitalny dla każdej osoby w tablicy

      Hints:
      - nie używaj w tym zadaniu funkcji strzałkowej, ponieważ słówko this Ci nie zadziała i nie będziesz miał(a)
      dostępu do this.firstName lastName i nickname
      - postaraj się zdefiniować funkcję powitalną tylko raz (nie rób tego w pętli, ani funkcji map)
      

  */

//  DANE WEJŚCIOWE

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];
const people3 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    getFavouriteColor,
  },
];
function getFavouriteColor(number) {
  if (number < 1) {
    console.log(`Podałeś za małą liczbę, liczba nie może być mniejsza niż 1`);
  } else if (number > 30) {
    console.log(`Podałeś za dużą liczbę, liczba nie może być większa niż 30`);
  } else if (number === undefined) {
    const sum =
      this.firstName.length + this.lastName.length + this.nickname.length;
    const index = Math.abs(sum - 5) % colors.length;
    const FavouriteColor = colors[index];
    console.log(`FavouriteColor:`, FavouriteColor);
  } else {
    const sum =
      this.firstName.length + this.lastName.length + this.nickname.length;
    const index = Math.abs(sum - number) % colors.length;
    const FavouriteColor = colors[index];
    console.log(`FavouriteColor:`, FavouriteColor);
  }
}
console.log(`Zadanie 3.`);
people3[0].getFavouriteColor(5);
console.log(`---`);
/*
      3. 
      a) Dodaj do każdego obiektu funkcję getFavouriteColor
      b) funkcja ma przyjmować jeden parametr typu number z zakresu 1 - 30
      c) jeżeli podany parametr jest poza zakresem, powinien wyświetlić się odpowiedni komunikat
          - podałeś za małą liczbę, liczba nie może być mniejsza niż 1
          - podałeś za dużą liczbę, liczba nie może być większa niż 30
      d) w przypadku wywołania funkcji bez parametru, powinniśmy ustawić domyślną wartość na 5
      e) funkcja powinna zsumować wszystkie litery imienia, nazwiska i przezwiska, 
      odjąć od tej sumy liczbę wprowadzoną w parametrze, a następnie za pomocą działania modulo (%) względem długości tablicy kolorów
      wyznaczyć index
      f) za pomocą indexu funkcja powinna wyciągnąć odpowiedni kolor z tablicy i wyświetlić go w konsoli.
      Dla powyższego przykładu i liczby 5 wprowadzonej w parametrze, powinniśmy uzyskać wynik:
      (22 - 5) % 6 = 5
      console.log("orange")
      Hints
      - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
      Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
      - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
      dowoloną ilość kolorów
  */

console.log(`Zadanie 4.a) b)`);
const colors2 = ["red", "green", "yellow", "blue", "pink", "orange"];
const people4 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
  },
  {
    firstName: "Piotrulo",
    lastName: "Kurzydymulo",
    nickname: "Kurzy",
  },
  {
    firstName: "James",
    lastName: "Hetfield",
    nickname: "Jaymz",
  },
];
function getFavouriteColor2(a, arrayIndex) {
  if (a < 1) {
    console.log(`Podałeś za małą liczbę, liczba nie może być mniejsza niż 1`);
  } else if (a > 30) {
    console.log(`Podałeś za dużą liczbę, liczba nie może być większa niż 30`);
  } else if (arrayIndex < 0) {
    console.log(
      `Podana liczba określająca index obiektu nie może być mniejsza niż 0`
    );
  } else if (arrayIndex > people4.length - 1) {
    console.log(
      `Podana liczba określająca index obiektu nie może być większa niż ${
        people4.length - 1
      }`
    );
  } else if (a === undefined) {
    const sum2 =
      people4[arrayIndex].firstName.length +
      people4[arrayIndex].lastName.length +
      people4[arrayIndex].nickname.length;
    const index2 = Math.abs(sum2 - 5) % colors2.length;
    const FavouriteColor2 = colors2[index2];
    console.log(`FavouriteColor:`, FavouriteColor2);
  } else {
    const sum2 =
      people4[arrayIndex].firstName.length +
      people4[arrayIndex].lastName.length +
      people4[arrayIndex].nickname.length;
    const index2 = Math.abs(sum2 - a) % colors2.length;
    const FavouriteColor2 = colors2[index2];
    console.log(`FavouriteColor:`, FavouriteColor2);
  }
}
getFavouriteColor2(1, 0);
console.log(`---`);

console.log(`Zadanie 4.c)`);
function getFavouriteColor3(a) {
  if (a < 1) {
    console.log(`Podałeś za małą liczbę, liczba nie może być mniejsza niż 1`);
  } else if (a > 30) {
    console.log(`Podałeś za dużą liczbę, liczba nie może być większa niż 30`);
  } else {
    for (let person of people4) {
      const sum3 =
        person.firstName.length +
        person.lastName.length +
        person.nickname.length;
      const index3 = Math.abs(sum3 - a) % colors2.length;
      const FavouriteColor3 = colors2[index3];
      console.log(`FavouriteColor:`, FavouriteColor3);
    }
  }
}
getFavouriteColor3(1);
console.log(`---`);
/*
      4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
      a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
      b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
      c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
  */

console.log(`Zadanie 5.a) b) c)`);
const people5 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself() {},
    getFavouriteColor() {},
  },
  {
    firstName: "Piotrulo",
    lastName: "Kurzydymulo",
    nickname: "Kurzy",
    introduceYourself() {},
    getFavouriteColor() {},
  },
  {
    firstName: "Magda",
    lastName: "Borsuk",
    nickname: "Megie",
  },
  {
    firstName: "James",
    lastName: "Hetfield",
    nickname: "Jaymz",
  },
  {
    firstName: "Kasia",
    lastName: "Kowalska",
    nickname: "Kate",
  },
  {
    firstName: "Anna",
    lastName: "Piwowarczyk",
    nickname: "Ciemnowłosa",
  },
];

const isElite = Math.round(Math.random() * 100);
const isEliteisPrime = (isElite) => {
  if (isElite % 3 === 0 && isElite % 5 === 0) {
    return true;
  }
  if (isElite < 2) {
    return false;
  }
  if (isElite === 2 || isElite === 3) {
    return true;
  }
  const sq = Math.sqrt(isElite);
  for (let i = 2; i <= sq; i++) {
    if (isElite % i === 0) {
      return false;
    }
  }
  return true;
};
console.log(`Wartość isElite:`, isElite);
console.log(
  `Czy to jest liczba pierwsza lub podzielna przez 3 i 5 ?`,
  isEliteisPrime(isElite)
);
console.log(`Zadanie 5.d)`);

let resabcde = people5
  .filter(people5Filtered)
  .map(poeple5Reversed)
  .reduce(poeple5Redused);

function people5Filtered(object) {
  const res = isEliteisPrime(isElite);
  if (res === false)
    return (
      (object.firstName[object.firstName.length - 1] === `a` ||
        object.firstName[object.firstName.length - 1] === `k`) &&
      object.lastName.length > 6 &&
      object.nickname.includes("a")
    );
  return object;
}
console.log(`---`);

function poeple5Reversed(item) {
  let reversedPerson = {};
  let i = 0;

  for (let key in item) {
    reversedPerson = { ...reversedPerson, [item[key]]: key };
    if (i === 2) {
      console.log(`reversedPerson:`, reversedPerson);
      return reversedPerson;
    }
    i++;
  }
}

function poeple5Redused(accEntries, itemEntries) {
  return { ...accEntries, ...itemEntries };
}
console.log(`Wynik dla 5.a) b) c) d) e) łącznie:`, resabcde);
console.log(`---`);

/*
      5. Zadanie polega na użyciu .filter() .map() .reduce w wersji łańcuchowej,
      czyli nie twórz nowych tablic w momencie wykonanie jednej z powyższych metod, połącz wykonanie ze sobą w jeden 
      "łańcuch" tzn. const wynik = arr.filter().map().reduce()
      a) Przefiltruj tablicę w taki sposób, aby zostały w niej osoby,
      których imię kończy się na literę 'a' lub 'k' 
      i nazwisko ma więcej znaków niż 6 
      i nick zawiera w sobie przynajmniej jedną literę a
      b) do powyższego warunku dodaj "furtkę" w postaci parametru isElite. Zmienna isElite powinna być obliczona
      za pomocą generatora liczb pseudolosowych Math.random(). Za pomocą tego generatora wylosujcie liczbę z zakresu 0 - 100.
      Jeżeli wartość losowej liczby będzie liczbą pierwszą lub będzie podzielna przez 3 i 5, ustawcie isElite na true, w pozostałych przypadkach
      isElite powinno być ustawione na false
      c) jeżeli zmienna isElite ma wartość true, nie bierzcie pod uwagę warunku z punktu a przy filtracji
      d) za pomocą funkcji map i for in odwróccie wartości i klucze w obiekcie, usuwając przy tym funkcje
      Przykład
      INPUT
      {
          firstName: "Bartolomeo",
          lastName: "Lozano",
          nickname: "Rabona",
          introduceYourself: '' // funkcja zamiast pustego stringa
          getFavouriteColor: '' // funkcja zamiast pustego stringa
      },
      OUTPUT
      {
          Bartolomeo: "firstName",
          Lozano: "lastName",
          Rabona: "nickname",
      },
      e) zredukuj tablicę obiektów do pojedynczego obiektu, który będzie zawierał wszystkie klucze i wartości
      wszystkich obiektów z tablicy, dzięki temu, że w punkcie d) odwrócilismy klucze z wartościami, nie będzie 
      z tym problemu :)
      *f) odtwórz z obiektu tablicę, która będzie zawierała same nicknames i 
      nazwiska, ktdjest < s i
      imię, którego chociaż jedna litera jest większa >= s
      g) posortuj tablicę alfabetycznie
  */
console.log(`Zadanie 6.a)`);
const multi = (a) => {
  return (b) => {
    return a * b;
  };
};

console.log(multi(5)(6));
const multiplyBySix = multi(6);
console.log(multiplyBySix(10));
console.log(`---`);

console.log(`Zadanie 6.b)`);
const multi2 = (a) => {
  return (b) => {
    return (c) => {
      return (d) => {
        return a * b * c * d;
      };
    };
  };
};
console.log(multi2(4)(5)(6)(10));

console.log(`---`);
/*
      *6. Currying function
      a) Napisz taką funkcję mnożącą 2 liczby, aby możliwe były następujące wywołania:
      - multi(5)(6)
      - const multiplyBySix = sum(6)
        multiplyBySix(10)
      b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
      - multi(4)(5)(6)(10)
      Hints:
      - funkcja może zwracać inne funkcje
      - funkcja może korzystać ze zmiennych i parametrów funkcji zewnętrznych (czyli tych w których się znajduje)
  */

/*
      **7. Rekurencja
       a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
       ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
       Na przykład 'Kamil Bartek'
      INPUT:
  */
console.log(`Zadanie 7.`);

const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
let names = [];
function getNames(a) {
  let searchedName;
  for (let [key, value] of Object.entries(a)) {
    if (key === `name`) {
      searchedName = value;
    } else if (key === `name2`) {
      searchedName += ` ` + value;
    } else if (key === `name3`) {
      searchedName += ` ` + value;
    } else if (key === `children`) {
      for (i = 0; i < value.length; i++) {
        getNames(value[i]);
      }
    }
  }
  names.push(searchedName);
}
getNames(nestedObject);
console.log(`names`, names);
