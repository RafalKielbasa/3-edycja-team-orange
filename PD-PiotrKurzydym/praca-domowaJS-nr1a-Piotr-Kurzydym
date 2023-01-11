/*
Deadline  - ?
Przydatne linki:
API - https://swapi.dev/
Dokumentacja SWAPI - https://swapi.dev/documentation
SWAPI jest otwartym API, w którym znajdziemy dane z universum STAR WARS
CEL: Implementacja interaktywnej aplikacji www
a) Stwórz pliki
    index.html
    script.js
    style.css
b) podłącz plik script i style do index.html
c) napisz funkcję pobierającą linki do dostępnych danych w SWAPI
    https://swapi.dev/api/ (BASE_URL)
d) Stwórz na górze strony przyciski bazujące na danych, które zejdą po wykonaniu funkcji z punktu c)
    *miej na uwadze że dane pochodzące z API mogą być różne, dlatego bazuj tylko na danych, które zejdą
   z API, nie pisz na sztywno nazw filmy/postacie itd.
e) Po kliknięciu w przycisk wywołaj odpowiedni endpoint pobierający daną kolekcję danych.
    np. przycisk films powienien pobierać dane z https://swapi.dev/api/films/
    *napisz funcję z punktu c) w taki sposób, żeby można ją było używać także tutaj
f) Przygotuj dla każdej kolekcji klasę, która w konstruktorze przyjmie co najmniej 4 parametry pochodzące z modelu, który pobierzesz,
    następnie dla całej listy stwórz tablicę obiektów, które będą instancjami danej klasy films/people/planets/species/starships/vehicles
    *jeżeli znajdziesz jakiekolwiek punkty wspólne, możesz pokusić się o dziedziczenie po klasie bazowej
g) Na podstawie stworzonych obiektów wyświetl tabelkę, w której
    - nagłówkami będą nazwy właściwości obiektów
    - ostatnią kolumną będzie data 'created' przeformatowana do formatu DD-MM-YY
    - pierwszą kolumną będzie # liczba porządkowa 1,2,3...
    - na końcu każdego wiersza pojawią się 2 przyciski/ikony, DELETE i DETAILS
    - po kliknięciu w DETAILS wyświetl listę po lewej stronie ekranu, a po prawej pokaż rozszerzony widok konkretnego modelu
    - na widoku modelu dodaj przycisk close, który zamknie detailsy i ponownie wyświetli listę na środku ekranu
    - kliknięcie DELETE wyświetla modal: "Are you sure", z przyciskami YES i NO, po kliknięciu YES usuwamy element z listy, po kliknięciu NO zamykamy modal
h) do tabelki dodaj paginację
    - poprzednia strona (z zablokowaniem < 1)
    - następna strona (oblicz ilość stron na podstawie ilosci wynikow i ilosci wyswietlonych elementow na 1 stronie)
    - input, w którym możemy wpisać do której strony chcemy przejść (walidacja)
    - select, w którym możemy zmienić ilość elementów wyświetlanych na stronie
*i) widok każdego modelu, powinen zawierać unikalną funkcję zaimplementowaną na klasie danego modelu
    np. dla films mógłby to być przycisk, który po kliknięciu w modalu wyświetli opis tego filmu
**j) zaimplementuj 2 rodzaje wyszukiwarki
    - za pomocą użycia odpowiednich parametrów w endpointach konkretnych modeli
    - za pomocą przeszukiwania tabelki(tablicy) bez używania endpointu
***j) dodaj 3 ukryte funkcjonalności, które wszystkich zaskoczą
    np. po klinięciu 'enter' wyświetli się komunikat GAME OVER i otworzy się nowa karta w przeglądarce
    po najechaniu myszką na logo, bądź inny element odpali się dźwięk/film/animacja
    w tym zadaniu liczy się Wasza kreatywność, znajdźcie coś co nas zaskoczy
****k) dodaj możliwośc zaznaczania checkboxem wierszy na tabelce, dzięki czemu na raz będziemy mogli usunąć kilka itemów z listy, a nie tylko jeden
*****l) korzystając z wiedzy zdobytej podczas tworzenia gry, spróbuj za pomocą modelu(klasy) postaci zaimplementować walkę 2 postaci
    jedna postać niech to będzie "sztuczna inteligencja", zaimplementowana za pomocą ifów
    drugą postacią będziemy grać my, czyli musi być opcja wygrania i przegrania z przeciwnikiem :)
Osoby chętne będą miały możliwość prezentacji swoich prac domowych przed całą grupą, jeżeli nie znajdziemy
chętnych wybierzemy w ramach losowaniu 3 "ochotników" :D
Dodaje, że style css, responsywność, jakość wykonaniu detailsów ma duże znaczenie, więc proszę nie zaniedbywać detailsów i oczywiście dodatkowe rzeczy
są bardzo mile widziane, np. w pierwszej edycji były osoby, co użyły css variables i na tej podstawie dodały funkcjonalność zmiany themingu z jasnego na ciemny i odwrotnie.
Poniżej przykładowa makieta, w celu ułatwienia Wam startu.
Dajcie znać jak macie pytania, kolejny live zrobimy we wtorek, do tego czasu spróbujcie zrobić ile dacie radę, na livie wytłumaczę niejasności. Ostatnie punkty są dla ludzi o mocnych nerwach :slightly_smiling_face: jak dojdziecie do i) to będzie super, jednakże zachęcam do wykonania każdego podpunktu :wink:
*/