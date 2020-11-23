import { throttle, debounce, deepClone, createRandom } from "./lib/tools";

var parent01 = document.getElementById("demo01");
parent01.querySelector("button").addEventListener("click", fn01);
function fn01() {
  throttle(() => {
    const h3 = parent01.querySelector("h3");
    h3.textContent = parseInt(h3.textContent) + 1;
  }, 2000);
}

var parent02 = document.getElementById("demo02");
parent02.querySelector("button").addEventListener("click", fn02);
function fn02() {
  debounce(() => {
    const h3 = parent02.querySelector("h3");
    h3.textContent = parseInt(h3.textContent) + 1;
  }, 2000);
}

var parent03 = document.getElementById("demo03");
parent03.querySelector("button").addEventListener("click", fn03);
function fn03() {
  const data = true;
  console.log(deepClone(data));
}

var parent04 = document.getElementById("demo04");
parent04.querySelector("button").addEventListener("click", fn04);
function fn04() {
  const data = new Date().format("yyyy-YY-MM-M-DD-d-HH-h-m-mm-S-ss");
  console.log(data);
}

document.getElementById("demo05").onclick = function () {
  console.log(createRandom());
};
