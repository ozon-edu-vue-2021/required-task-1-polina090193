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
})({"scripts/index.js":[function(require,module,exports) {
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var action = document.querySelector('.action');
var templateImageCard = document.querySelector('#image');
var templateImagePopup = document.querySelector('#popup-image');
var container = document.querySelector('.images');
var popup = document.querySelector('.popup');
var popupContainer = document.querySelector('.popup .content');
var popupClose = document.querySelector('.popup .action');
var loader = document.querySelector('.loader');
var MAX_PAGE_IAMGES = 34;
var loaderTimeout;
/**
 * Функция задаёт первоначальное состояние страницы.
 * Отправляется первый запрос за картинками, без параметров т.к. с дефолтными настройками.
 */

var initialState = function initialState() {
  action.disabled = false;
  getPictures();
};
/**
 * Функция запрашивает картинки для галереи
 * и вызывает ф-цию отрисовки полученных картинок
 * @param {number} page
 * @param {number} limit
 */


var getPictures = function getPictures() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  showLoader();
  fetch("https://picsum.photos/v2/list?page=".concat(page, ";limit=").concat(limit)).then(function (response) {
    return response.json();
  }).then(function (result) {
    renderPictures(result);
  });
};
/**
 * Функция запрашивает информацию о конкретной картинке по её id
 * и вызывает ф-цию для отрисовки картинки в попапе
 * @param {number} id
 */


var getPictureInfo = function getPictureInfo() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  showLoader();
  fetch("https://picsum.photos/id/".concat(id, "/info")).then(function (response) {
    return response.json();
  }).then(function (result) {
    renderPopupPicture(result);
  });
};
/**
 * Функция показывает индикатор загрузки.
 * Меняет ситили, ничего не возвращает.
 */


var showLoader = function showLoader() {
  loader.style.visibility = 'visible';
};
/**
 * Функция скрывает индикатор загрузки.
 * Удаляет таймаут индикатора, ничего не возвращает.
 */


var hideLoader = function hideLoader() {
  loaderTimeout = setTimeout(function () {
    loader.style.visibility = 'hidden';
    clearTimeout(loaderTimeout);
  }, 700);
};
/**
 * Функция пропорционально делит размер картинки,
 * чтобы в превью не загружать слишком большие картинки,
 * которые возвращает сервис
 * @param {string} src
 * @param {number} size
 */


var cropImage = function cropImage(src) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var _src$split$splice = src.split('/').splice(2),
      _src$split$splice2 = _slicedToArray(_src$split$splice, 5),
      domain = _src$split$splice2[0],
      key = _src$split$splice2[1],
      id = _src$split$splice2[2],
      width = _src$split$splice2[3],
      height = _src$split$splice2[4];

  var newWidth = Math.floor(+width / size);
  var newHeight = Math.floor(+height / size);
  return "https://".concat(domain, "/").concat(key, "/").concat(id, "/").concat(newWidth, "/").concat(newHeight);
};
/**
 * Функция копирует шаблон для каждой картинки,
 * заполняет его и встраивает в разметку
 * @param {array} list
 */


var renderPictures = function renderPictures(list) {
  if (!list.length) {
    throw Error("Pictures not defined. The list length: ".concat(list.length));
  }

  list.forEach(function (element) {
    var clone = templateImageCard.content.cloneNode(true);
    var link = clone.querySelector('a');
    var image = clone.querySelector('img');
    var fragment = document.createDocumentFragment();
    link.href = element.url;
    link.dataset.id = element.id;
    image.src = cropImage(element.download_url, 5);
    image.alt = element.author;
    image.classList.add('preview');
    fragment.appendChild(clone);
    container.appendChild(fragment);
  });
  hideLoader();
};
/**
 * Функция копирует шаблон для картинки в попапе,
 * заполняет его и встраивает в попап
 * @param {object} picture
 */


var renderPopupPicture = function renderPopupPicture(picture) {
  var clone = templateImagePopup.content.cloneNode(true);
  var img = clone.querySelector('img');
  var link = clone.querySelector('a');
  var author = clone.querySelector('.author');
  img.src = cropImage(picture.download_url, 2);
  img.alt = picture.author;
  author.textContent = picture.author;
  img.width = picture.width / 10;
  link.href = picture.download_url;
  popupContainer.innerHTML = '';
  popupContainer.appendChild(clone);
  hideLoader();
  togglePopup();
};
/**
 * Функция переключает класс открытия на попапе
 */


var togglePopup = function togglePopup() {
  popup.classList.toggle('open');
};
/**
 * @type {object} MouseEvent
 */

/**
 * Обработчик кнопки подгрузки картинок
 * @param {MouseEvent} evt
 */


var actionHandler = function actionHandler(evt) {
  evt.preventDefault();
  var nextPage = evt.currentTarget.dataset.page;
  evt.currentTarget.dataset.page = +nextPage + 1;

  if (nextPage > MAX_PAGE_IAMGES) {
    console.warn("WARN: You are trying to call a page that exceeds ".concat(MAX_PAGE_IAMGES));
    evt.currentTarget.disabled = true;
  } else {
    getPictures(nextPage);
  }
};
/**
 * Обработчик события click по картинкам.
 * Запрашивает данные по картинке, на которую кликнули,
 * для открытия попапа с ней
 * @param {MouseEvent} evt
 */


var imageHandler = function imageHandler(evt) {
  evt.preventDefault();
  var targetLink = evt.target.closest('a');

  if (targetLink) {
    getPictureInfo(targetLink.dataset.id);
  }
};

action.addEventListener('click', actionHandler);
container.addEventListener('click', imageHandler);
popupClose.addEventListener('click', togglePopup);
initialState();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60205" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map