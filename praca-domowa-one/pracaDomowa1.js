// /  DANE WEJŚCIOWE
// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//   },
//   {
//     firstName: "Mateo",
//     lastName: "Loza",
//   },
//   {
//     firstName: "Ki",
//     lastName: "So",
//   },
// ];

// const reverse = (string, firstParameter, secondParameter) =>
//   string
//     .slice(firstParameter, secondParameter)
//     .split("")
//     .reverse()
//     .join("")
//     .toLowerCase();

// const peopleMapped = people.map((name) => {
//   const firstName = name.firstName;
//   const lastName = name.lastName;
//   const nickname1 = reverse(name.firstName, 0, 3);
//   const nickname2 = reverse(name.lastName, -3);
//   let nickname = nickname1 + nickname2;
//   nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);

//   return { firstName, lastName, nickname };
// });

// console.log(peopleMapped);
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

//  DANE WEJŚCIOWE
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
  const intro = `Czesc jestem ${this.firstName} ${this.lastName}, ale w szkole mowią do mnie ${this.nickname}`;
  console.log(intro);
}

for (let i = 0; i < people.length; i++) {
  people[i].introduceYourself = introduceYourself;
}

const personIntro = people.forEach((person) => person.introduceYourself());

console.log(personIntro);

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

const getFavColor = function getFavouriteColor(number = 5) {
  if (number < 1) {
    return console.log(
      "Podałeś za małą liczbę, liczba nie moze być mniejsza niz 1"
    );
  }
  if (number > 30) {
    return console.log(
      "Podałeś za duzą liczbę, liczba nie moze być większa niz 30"
    );
  } else {
    indexColor =
      Math.abs(
        this.firstName.length +
          this.lastName.length +
          this.nickname.length -
          number
      ) % colors.length;
    return console.log(colors[indexColor]);
  }
};

for (let i = 0; i < people.length; i++) {
  people[i].getFavColor = getFavColor;
}

console.log(people);

console.log(people[0].getFavColor());

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

const getFavColor2 = (person, number = 5) => {
  if (number < 1) {
    return console.log(
      "Podałeś za małą liczbę, liczba nie moze być mniejsza niz 1"
    );
  }
  if (number > 30) {
    return console.log(
      "Podałeś za duzą liczbę, liczba nie moze być większa niz 30"
    );
  } else {
    let indexColor =
      Math.abs(
        person.firstName.length +
          person.lastName.length +
          person.nickname.length -
          number
      ) % colors.length;
    return console.log(colors[indexColor]);
  }
};

for (let person of people) {
  getFavColor2(person, 2);
}

/*
    4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
    a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
    b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
    c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
*/

