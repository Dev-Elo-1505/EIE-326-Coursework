const counter = document.getElementById("count");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

const increment = () => {
  counter++
};

const decrement = () => {counter--};

plus.addEventListener(onclick, increment);
minus.addEventListener(onclick, decrement);
