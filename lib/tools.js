//节流
let _throttle_value = true;
function throttle(fn, interval) {
  if (_throttle_value) {
    _throttle_value = false;
    fn();
    const tid = setTimeout(() => {
      _throttle_value = true;
      clearTimeout(tid);
    }, interval);
  }
}
export { throttle };

//防抖
let _debounce_value;
function debounce(fn, interval) {
  if (_debounce_value) {
    clearTimeout(_debounce_value);
  }
  _debounce_value = setTimeout(() => {
    fn();
  }, interval);
}
export { debounce };

//深克隆
const weakmap = new WeakMap();
function deepClone(data) {
  if (typeof data !== "object" && typeof data !== "function") return data;

  const type = Object.prototype.toString.call(data).match(/(?<=\b\s)\w+/)[0];

  if (type === "RegExp") {
    return new RegExp(data.source, data.flags);
  } else if (type === "Date") {
    return new Date(data);
  } else if (type === "String") {
    return new String(data);
  } else if (type === "Number") {
    return new Number(data);
  } else if (type === "Boolean") {
    return new Boolean(data);
  } else if (type === "Function") {
    return data;
  }

  if (weakmap.get(data)) {
    return weakmap.get(data);
  }
  const obj = type === "Array" ? [] : {};

  weakmap.set(data, obj);

  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    obj[key] = deepClone(data[key]);
  }
  return obj;
}

export { deepClone };

//日期格式话
Date.prototype.format = function (fmt) {
  if (typeof fmt !== "string") {
    throw new Error("输入格式不正确!");
  }
  const hash = {
    yyyy: this.getFullYear(),
    yy: this.getFullYear().toString().slice(2, 4),
    MM:
      this.getMonth() < 9
        ? "0" + (this.getMonth() + 1)
        : (this.getMonth() + 1).toString(),
    M: (this.getMonth() + 1).toString(),
    dd:
      this.getDate() < 10
        ? "0" + this.getDate() + 1
        : this.getDate().toString(),
    d: this.getDate().toString(),
    hh: this.getHours(),
    h: this.getHours() > 12 ? this.getHours() - 12 : this.getHours(),
    mm:
      this.getMinutes() < 10
        ? "0" + this.getMinutes()
        : this.getMinutes().toString(),
    m: this.getMinutes().toString(),
    ss:
      this.getSeconds() < 10
        ? "0" + this.getSeconds()
        : this.getSeconds().toString(),
    s: this.getSeconds().toString(),
  };
  const keys = Object.keys(hash);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let reg;
    if (["M", "MM", "m", "mm"].indexOf(key) > -1) {
      reg = new RegExp(key, "g");
    } else {
      reg = new RegExp(key, "gi");
    }
    fmt = fmt.replace(reg, hash[key]);
  }
  return fmt;
};

//guid
function newGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export { newGuid };

//生成指定范围随机数
let temp_random = 0;
function createRandom(start = 1, end = 10) {
  let random = parseInt(Math.random() * end) || 0;
  random += temp_random;
  if (random > start && random < end) {
    temp_random = 0;
    return random;
  } else if (random >= end) {
    temp_random = 0;
    return createRandom(start, end);
  } else {
    temp_random += random;
    return createRandom(start, end);
  }
}

export { createRandom };
