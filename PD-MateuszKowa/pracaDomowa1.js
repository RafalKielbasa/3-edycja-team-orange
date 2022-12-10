//  DANE WEJŚCIOWE
const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
  {
    firstName: "Ma",
    lastName: "Lo",
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
    (value.firstName[0] || "") +
    (value.firstName[1] || "") +
    (value.firstName[2] || "");
  const revFirstName = reverseString(splittedFirstName);
  const revLastNameArr = reverseString(value.lastName);
  const revLastName =
    (revLastNameArr[0] || "") +
    (revLastNameArr[1] || "") +
    (revLastNameArr[2] || "");
  let nickName = (revFirstName + revLastName).toLowerCase();
  nickName = nickName.replace(nickName[0], nickName[0].toUpperCase());
  const result = {
    ...people[index],
    nickName: nickName,
  };
  return result;
}
console.log(people.map(giveNickname));
