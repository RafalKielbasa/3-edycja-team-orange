//  DANE WEJŚCIOWE

const people = [
  {
    firstName: "Bartolomeoa",
    lastName: "Lozanobb",
  },
  {
    firstName: "Mateoaa",
    lastName: "Lozakka",
  },
  {
    firstName: "Ma",
    lastName: "Lo",
  },
  {
    firstName: "Ta",
    lastName: "Kaaa",
  },
  {
    firstName: "Thomabk",
    lastName: "Mooreaaa",
  },
];

/* 
    1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
    a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
    //onazoL
    //Lozano
    b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string do poprzedniego
    c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnych wielkich liter poza 1.
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
function reverseString(string) {
  const splitStr = string.split("");
  const revSplitStr = splitStr.reverse().join("");
  return revSplitStr;
}
function giveNickname(value, index) {
  const splittedFirstName =
    (value.firstName[0] || "") + (value.firstName[1] || "") + (value.firstName[2] || "");
  const revFirstName = reverseString(splittedFirstName);
  const revLastNameArr = reverseString(value.lastName);
  const revLastName =
    (revLastNameArr[0] || "") + (revLastNameArr[1] || "") + (revLastNameArr[2] || "");
  let nickName = (revFirstName + revLastName).toLowerCase();
  nickName = nickName.replace(nickName[0], nickName[0].toUpperCase());
  const result = {
    ...people[index],
    nickname: nickName,
  };
  return result;
}
// console.log(people.map(giveNickname));
const people_1 = people.map(giveNickname);
// //  DANE WEJŚCIOWE
// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//   },
// ];

/* 
    2. 
    a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.
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
function introduceYourself() {
  // const text = `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie [${this.nickname}]`;
  // console.log(text);
}
const people_2 = people_1.map((value) => ({
  ...value,
  introduceYourself,
}));
people_2.forEach((value) => value.introduceYourself());

//  DANE WEJŚCIOWE
// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//     introduceYourself: "", // funkcja zamiast pustego stringa
//   },
// ];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

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
function getFavouriteColor(number) {
  const typeNumber = typeof number;
  if (typeNumber === "undefined") {
    number = 5;
  } else if (number < 1) {
    console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number > 30) {
    console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  }
  const charSum = this.firstName.length + this.lastName.length + this.nickname.length;
  const result = Math.abs(charSum - number);
  const resultWithMod = result % colors.length;
  console.log(`${this.firstName} your favourite color is ${colors[resultWithMod]}`);
}
const people_3 = people_2.map((value) => ({ ...value, getFavouriteColor }));
// people_3.forEach((value) => value.getFavouriteColor());

/*
    4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
    a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
    b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
    c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
*/
function getFavouriteColorNoObject(object, number) {
  const typeNumber = typeof number;
  if (typeNumber === "undefined") {
    number = 5;
  } else if (number < 1) {
    console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number > 30) {
    console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  }
  const charSum = object.firstName.length + object.lastName.length + object.nickname.length;
  const result = Math.abs(charSum - number);
  const resultWithMod = result % colors.length;
  // console.log(`${object.firstName} your favourite color is ${colors[resultWithMod]}- forloop`);
}
// for (value of people_2) {
//   getFavouriteColorNoObject(value);
// }
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

function checkExceptions() {
  let checkPrime = true;
  const isElite = Math.ceil(Math.random() * 100);
  for (let i = 2; i <= isElite / 2; i++) {
    if (isElite % i == 0) {
      checkPrime = false;
      break;
    }
  }
  return checkPrime;
}
const primeDoor = checkExceptions();
function checkArray(value) {
  const FNLenghth = value.firstName.length;
  const LetterArr = ["k", "a"];
  if (primeDoor == true || (value % 3 == 0 && value % 5 == 0)) {
    return true;
  } else if (
    LetterArr.includes(value.firstName[FNLenghth - 1]) &&
    value.lastName.length > 6 &&
    value.nickname.indexOf("a") != -1
  ) {
    return true;
  }
}
function mapArray(value) {
  let newObject = {};
  for (key in value) {
    if (typeof value[key] === "function") {
      delete key;
    } else {
      newObject[value[key]] = key;
    }
  }
  return newObject;
}

const people_4 = people_3
  .filter(checkArray)
  .map(mapArray)
  .reduce((acc, val) => {
    for (key in val) {
      acc[key] = val[key];
    }
    return acc;
  }, {});
function lastFiltration(object) {
  sValue = "s".charCodeAt();
  charArr = [];
  for (key in object) {
    const splittedKey = [...key];
    if (object[key] === "lastName" || object[key] === "nickname") {
      if (splittedKey.every((a) => a.toLowerCase().charCodeAt() < sValue)) {
        charArr.push(key);
      }
    } else if (object[key] === "firstName") {
      if (splittedKey.some((a) => a.toLowerCase().charCodeAt() >= sValue)) {
        charArr.push(key);
      }
    }
  }
  return charArr;
}

// console.log("people_4", people_4);
// console.log(lastFiltration(people_4).sort());

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
function multi(a) {
  return (b) => {
    return a * b;
  };
}
const multiplyBySix = multi(6);
// console.log("zadanie 6a", multiplyBySix(10));

function multiFour(a) {
  return (b) => {
    return (c) => {
      return (d) => {
        return a * b * c * d;
      };
    };
  };
}
// console.log("zadanie 6b", multiFour(4)(5)(6)(10));
/*
    **7. Rekurencja
     a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
     ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
     Na przykład 'Kamil Bartek'
    INPUT:
*/
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
const nameArray = [nestedObject.name];
function takeNames(object) {
  for (key in object) {
    if (Array.isArray(object[key])) {
      takeNames(object[key]);
    } else if (typeof object[key] === "object") {
      let helperValue = "";
      const newValue = object[key];
      for (val in newValue) {
        if (val !== "children") {
          helperValue += newValue[val] + " ";
        }
      }
      nameArray.push(helperValue);
      takeNames(object[key]);
    }
  }
  return nameArray;
}

// console.log("zadanie 7", takeNames(nestedObject));
const Grid = [
  [5, 1, 2, 3],
  [5, 4, 5, 6],
  [5, 7, 8, 9],
  [5, 6, 10, 11],
];
function changeGrid(value, index, array) {
  const result = value.map((v, i) => {
    return (
      (v || 0) +
      (value[i + 1] || 0) +
      (value[i - 1] || 0) +
      (array?.[index + 1]?.[i] || 0) +
      (array?.[index + 1]?.[i + 1] || 0) +
      (array?.[index + 1]?.[i - 1] || 0) +
      (array?.[index - 1]?.[i] || 0) +
      (array?.[index - 1]?.[i + 1] || 0) +
      (array?.[index - 1]?.[i - 1] || 0)
    );
  });

  return result;
}

console.log(Grid.map(changeGrid));

//   [12, 21, 16],
//   [27, 45, 33],
//   [24, 39, 28]
// //
// value[0] +
//     value[1] +
//     (value[-1] || 0) +
//     (array?.[index + 1]?.[0] || 0) +
//     (array?.[index + 1]?.[1] || 0) +
//     (array?.[index + 1]?.[-1] || 0) +
//     (array?.[index - 1]?.[0] || 0) +
//     (array?.[index - 1]?.[1] || 0) +
//     (array?.[index - 1]?.[-1] || 0);
