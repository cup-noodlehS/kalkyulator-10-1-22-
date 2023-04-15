const findAll = (x) => {
  return document.querySelectorAll(x);
};
const findOne = (x) => {
  return document.querySelector(x);
};
let display = findOne(".show");
let numbers = findAll(".number");
let clear = findOne(".clear");
let erase = findOne(".erase");
let percent = findOne(".modulo");
let symbol = findAll(".symbol");
let equal = findOne(".equal");
let oppspan = findOne(".opp");

let first = "";
let firstTruth = false;
let second = "";
let opperator = "";
let result = 0;
let togglePer = true;

clear.addEventListener("click", (e) => {
  first = "";
  second = "";
  display.innerText = "0";
  firstTruth = false;
  oppspan.innerText = "";
});
erase.addEventListener("click", (e) => {
  if (!firstTruth) {
    first = first.slice(0, first.length - 1);
    display.innerText = first;
  } else {
    second = second.slice(0, second.length - 1);
    display.innerText = second;
  }
});
percent.addEventListener("click", (e) => {
  if (togglePer) {
    display.innerText = `${parseFloat(display.innerText) * 100}%`;
  } else {
    display.innerText = first;
  }
  togglePer = !togglePer;
});
equal.addEventListener("click", (e) => {
  result = calc(parseFloat(first), parseFloat(second), opperator);
  display.innerText = result.toString();
  first = result.toString();
  second = "";
  firstTruth = false;
  oppspan.innerText = "";
});

function calc(x, y, opp) {
  if (opp == "/") {
    if (x / y == Infinity) {
      return "syntax error";
    } else {
      return x / y;
    }
  } else if (opp == "x") {
    return x * y;
  } else if (opp == "-") {
    return x - y;
  } else if (opp == "+") {
    return x + y;
  }
}

for (i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    let value = e.target.getAttribute("value");
    if (!firstTruth) {
      first += value;
      display.innerText = first;
    } else {
      second += value;
      display.innerText = second;
    }
  });
}
for (i = 0; i < symbol.length; i++) {
  symbol[i].addEventListener("click", (e) => {
    let value = e.target.getAttribute("value");
    if (first != "" && second == "") {
      opperator = value;
      oppspan.innerText = value;
      second = "";
      firstTruth = true;
    } else if (first !== "" && second !== "") {
      result = calc(parseFloat(first), parseFloat(second), opperator);
      first = result.toString();
      opperator = value;
      second = "";
      oppspan.innerText = value;
      firstTruth = true;
    }
  });
}
