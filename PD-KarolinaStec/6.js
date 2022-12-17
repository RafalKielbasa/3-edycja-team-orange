function multi(a) {
  return function (b) {
    return a * b;
  };
}
console.log(multi("a")(6));
const multiplyBySix = multi(6);
console.log(multiplyBySix(10));

function multiB(a) {
  return (b) => {
    return (c) => {
      return (d) => {
        return a * b * c * d;
      };
    };
  };
}
console.log("podpunkt b:", multiB(4)(5)(6)(10));
