function multiA(a) {
  return function (b) {
    return a * b;
  };
}
const multiplyBySix = multiA(6);

console.log(multiplyBySix(10));

console.log(multiA(5)(6));

//b

function multiB(a) {
  return function (b) {
    return function (c) {
      return (d) => a * b * c * d;
    };
  };
}

console.log("Zad6b", multiB(4)(5)(6)(10));
