/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__unit__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const grid = {};
  for (let i = 0; i < canvas.width; i += 20) {
    for (let n = 0; n < canvas.height; n += 20) {
      grid[[i,n]] = 0;
    }
  }
  const units = [];
  const selectedUnits = [];
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([0,0], grid));
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([100,100], grid));



  canvas.addEventListener("click", (target) => {
    const gridX = 20 * Math.floor(target.x / 20);
    const gridY = 20 * Math.floor(target.y / 20);
    selectUnits([[gridX, gridY]], grid, selectedUnits);
  });

  canvas.addEventListener("onmousedown", (target) => {
    
  })

  const update = () => {
    drawGrid(ctx, canvas);
    drawUnits(ctx, units);
    requestAnimFrame(() => {
      update();
    })
  }

  update();
})

const selectUnits = (coordinates, grid, selectedUnits) => {
  if (grid[coordinates]) {
    selectedUnits.forEach((unit) => {
      unit.selected = false;
    })
    selectedUnits.length = 0;
    for (let i = 0; i < coordinates.length; i++) {
      selectedUnits.push(grid[coordinates[i]])
      grid[coordinates[i]].selected = true;
    }
  }
}

const drawGrid = (ctx, canvas) => {
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let n = 0; n < canvas.height; n += 20) {
    ctx.beginPath();
    ctx.moveTo(0, n);
    ctx.lineTo(canvas.width, n);
    ctx.stroke();
  }
}

const drawUnits = (ctx, units) => {
  for(let i = 0; i < units.length; i++) {
    ctx.fillStyle = '#000000';
    if (units[i].selected) {
      ctx.fillStyle = '#00ff00';
    }
    ctx.fillRect(units[i].pos[0], units[i].pos[1], 20, 20);
  }
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
  };
})();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Unit {
  constructor(spawnPos, grid) {
    this.pos = spawnPos;
    grid[spawnPos] = this
    this.selected = false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Unit);


/***/ })
/******/ ]);