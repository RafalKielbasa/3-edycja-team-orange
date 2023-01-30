function multiPly(a) {
  return function (b) {
    return a * b;
  };
}
const multiplyBySix = multiPly(6);
console.log(multiplyBySix(10));

console.log(multiPly(5)(6));

function multiPly(a) {
  return function (b) {
    return function (c) {
      return (d) => a * b * c;
    };
  };
}
console.log(multiPly(4)(5)(6)(10));

