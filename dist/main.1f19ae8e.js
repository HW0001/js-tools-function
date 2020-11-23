// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/tools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.newGuid = newGuid;
exports.createRandom = createRandom;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _throttle_value = true;

function throttle(fn, interval) {
  if (_throttle_value) {
    _throttle_value = false;
    fn();
    var tid = setTimeout(function () {
      _throttle_value = true;
      clearTimeout(tid);
    }, interval);
  }
}

var _debounce_value;

function debounce(fn, interval) {
  if (_debounce_value) {
    clearTimeout(_debounce_value);
  }

  _debounce_value = setTimeout(function () {
    fn();
  }, interval);
}

var weakmap = new WeakMap();

function deepClone(data) {
  if (data === null) return null;
  if (data === undefined) return undefined;
  if (_typeof(data) !== "object" && typeof data !== "function") return data;
  var type = Object.prototype.toString.call(data).match(/(?<=\b\s)\w+/)[0];

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

  var obj = type === "Array" ? [] : {};
  weakmap.set(data, obj);
  var keys = Object.keys(data);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    obj[key] = deepClone(data[key]);
  }

  return obj;
}

Date.prototype.format = function (fmt) {
  if (typeof fmt !== "string") {
    throw new Error("输入格式不正确!");
  }

  var hash = {
    yyyy: this.getFullYear(),
    yy: this.getFullYear().toString().slice(2, 4),
    MM: this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1).toString(),
    M: (this.getMonth() + 1).toString(),
    dd: this.getDate() < 10 ? "0" + this.getDate() + 1 : this.getDate().toString(),
    d: this.getDate().toString(),
    hh: this.getHours(),
    h: this.getHours() > 12 ? this.getHours() - 12 : this.getHours(),
    mm: this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes().toString(),
    m: this.getMinutes().toString(),
    ss: this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds().toString(),
    s: this.getSeconds().toString()
  };
  var keys = Object.keys(hash);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var reg = void 0;

    if (["M", "MM", "m", "mm"].indexOf(key) > -1) {
      reg = new RegExp(key, "g");
    } else {
      reg = new RegExp(key, "gi");
    }

    fmt = fmt.replace(reg, hash[key]);
  }

  return fmt;
};

function newGuid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

var temp_random = 0;

function createRandom() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var random = parseInt(Math.random() * end) || 0;
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
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _tools = require("./lib/tools");

var parent01 = document.getElementById("demo01");
parent01.querySelector("button").addEventListener("click", fn01);

function fn01() {
  (0, _tools.throttle)(function () {
    var h3 = parent01.querySelector("h3");
    h3.textContent = parseInt(h3.textContent) + 1;
  }, 2000);
}

var parent02 = document.getElementById("demo02");
parent02.querySelector("button").addEventListener("click", fn02);

function fn02() {
  (0, _tools.debounce)(function () {
    var h3 = parent02.querySelector("h3");
    h3.textContent = parseInt(h3.textContent) + 1;
  }, 2000);
}

var parent03 = document.getElementById("demo03");
parent03.querySelector("button").addEventListener("click", fn03);

function fn03() {
  var data = true;
  console.log((0, _tools.deepClone)(data));
}

var parent04 = document.getElementById("demo04");
parent04.querySelector("button").addEventListener("click", fn04);

function fn04() {
  var data = new Date().format("yyyy-YY-MM-M-DD-d-HH-h-m-mm-S-ss");
  console.log(data);
}

document.getElementById("demo05").onclick = function () {
  console.log((0, _tools.createRandom)());
};

var obj = {
  a: [12, 33, 2, null],
  b: 2,
  c: {
    aaa: 2
  }
};
console.log((0, _tools.deepClone)(obj));
},{"./lib/tools":"lib/tools.js"}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50892" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map