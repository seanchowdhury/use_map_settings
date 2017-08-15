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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__astar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(4);





const cellSize = 10;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const grid = {}
  let gridInitX = 0
  let gridInitY
  const pathfindingGrid = []
  for (let i = 0; i < canvas.width; i += cellSize) {
    grid[gridInitX] = {}
    gridInitY = 0
    pathfindingGrid.push([])
    for (let n = 0; n < canvas.height; n += cellSize) {
      grid[gridInitX][gridInitY] = {}
      grid[gridInitX][gridInitY].path = 0
      gridInitY++
      pathfindingGrid[gridInitX].push(0)
    }
    gridInitX++
  }
  console.log(grid)
  console.log(pathfindingGrid)
  const game = new __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */](grid, pathfindingGrid)
  const units = []
  const selectedUnits = []
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([25,25], grid, pathfindingGrid))
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([5,5], grid, pathfindingGrid))
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([50,50], grid, pathfindingGrid))
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([15,52], grid, pathfindingGrid))
  units.push(new __WEBPACK_IMPORTED_MODULE_0__unit__["a" /* default */]([52,35], grid, pathfindingGrid))
  const selector = new __WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */](grid, pathfindingGrid, selectedUnits, cellSize)

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid(ctx, canvas)
    for (let i = 0; i < units.length; i++) {
      if (units[i].ralliedPos) {
        game.moveUnit(units[i])
      }
    }
    drawUnits(ctx, units)
    if (selector.selecting) {
      selector.drawSelector()
    }
    requestAnimFrame(() => {
      update()
    })
  }
  update()
})

const drawGrid = (ctx, canvas) => {
  ctx.strokeStyle = '#000000'
  for (let i = 0; i < canvas.width; i += cellSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    ctx.stroke()
  }
  for (let n = 0; n < canvas.height; n += cellSize) {
    ctx.beginPath()
    ctx.moveTo(0, n)
    ctx.lineTo(canvas.width, n)
    ctx.stroke()
  }
}

const drawUnits = (ctx, units) => {
  for(let i = 0; i < units.length; i++) {
    ctx.fillStyle = '#000000'
    if (units[i].selected) {
      ctx.fillStyle = '#00ff00'
    }
    ctx.fillRect(units[i].pos[0] * cellSize, units[i].pos[1] * cellSize, cellSize, cellSize)
  }
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60)
  };
})();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Unit {
  constructor(spawnPos, grid, pathfindingGrid) {
    this.pos = spawnPos
    this.pathfindingGrid = pathfindingGrid
    this.grid = grid
    grid[spawnPos[0]][spawnPos[1]].unit = this
    grid[spawnPos[0]][spawnPos[1]].path = 1
    pathfindingGrid[spawnPos[0]][spawnPos[1]] = 1
    this.ralliedPos = false
    this.selected = false
    this.timer = 30
    this.resetRally = this.resetRally.bind(this)
  }

  move(nextPos) {
    console.log(this.ralliedPos)
    this.pathfindingGrid[this.pos[0]][this.pos[1]] = 0
    this.grid[this.pos[0]][this.pos[1]].unit = undefined
    this.grid[this.pos[0]][this.pos[1]].path = 0
    this.pos[0] = nextPos[0]
    this.pos[1] = nextPos[1]
    this.pathfindingGrid[this.pos[0]][this.pos[1]] = 1
    this.grid[nextPos[0]][nextPos[1]].unit = this
    this.grid[nextPos[0]][nextPos[1]].path = 1
    if (this.pos[0] === this.ralliedPos[0] && this.pos[1] === this.ralliedPos[1]) {
      this.ralliedPos = false;
    }
  }

  resetRally(newPos) {
    this.ralliedPos = [newPos[0], newPos[1]]
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Unit);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Selector {
  constructor(grid, pathfindingGrid, selectedUnits, cellSize) {
    this.grid = grid
    this.pathfindingGrid = pathfindingGrid
    this.selectedUnits = selectedUnits
    this.cellSize = cellSize
    this.selecting = false
    this.startX
    this.startY
    this.UIcanvas = document.getElementById('UIcanvas')
    this.UIctx = this.UIcanvas.getContext('2d')

    this.drawSelector = this.drawSelector.bind(this)
    this.selectorRectangle = this.selectorRectangle.bind(this)
    this.selectCells = this.selectCells.bind(this)
    this.selectUnits = this.selectUnits.bind(this)
    this.unitAction = this.unitAction.bind(this)

    this.UIcanvas.addEventListener("mousedown", (target) => {
      this.drawSelector(target.x, target.y);
    })

    this.UIcanvas.addEventListener("mouseup", this.selectCells, false)

    this.UIcanvas.addEventListener("contextmenu", this.unitAction, false)
  }

  unitAction(target) {
    target.preventDefault();
    const endX = Math.floor(target.x / 10)
    const endY = Math.floor(target.y / 10)
    for (let i = 0; i < this.selectedUnits.length; i++) {
      this.selectedUnits[i].ralliedPos = [endX, endY]
    }
  }

  drawSelector(mouseX, mouseY) {
    if (this.selecting) {
      this.UIcanvas.addEventListener("mousemove", this.selectorRectangle, false)
    } else {
      this.selecting = true;
      this.startX = mouseX;
      this.startY = mouseY;
      this.UIctx.fillRect(mouseX, mouseY, 1, 1)
      this.UIctx.strokeRect(mouseX, mouseY, 1, 1)
    }
  }

  selectorRectangle(target) {
    this.UIctx.clearRect(0,0, this.UIcanvas.width, this.UIcanvas.height);
    this.UIctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
    this.UIctx.strokeStyle = '#94ff00'
    this.UIctx.fillRect(this.startX, this.startY, target.x - this.startX, target.y - this.startY)
    this.UIctx.strokeRect(this.startX, this.startY, target.x - this.startX, target.y - this.startY)
  }

  selectCells(target) {
    this.selecting = false;
    this.UIctx.clearRect(0, 0, this.UIcanvas.width, this.UIcanvas.height)
    this.UIcanvas.removeEventListener("mousemove", this.selectorRectangle, false)
    let startX = Math.floor(this.startX / this.cellSize)
    let startY = Math.floor(this.startY / this.cellSize)
    let endX = Math.floor(target.x / this.cellSize)
    let endY = Math.floor(target.y / this.cellSize)
    const coordinates = []
    if (startX > endX) {
      const tempX = startX
      startX = endX
      endX = tempX
    }
    if (startY > endY) {
      const tempY = startY
      startY = endY
      endY = tempY
    }

    for (let i = startX; i <= endX; i++) {
      for (let n = startY; n <= endY; n++) {
        coordinates.push([i,n])
      }
    }
    this.selectUnits(coordinates, this.grid, this.selectedUnits)
  }

  selectUnits(coordinates) {
    const newSelect = []
    for (let i = 0; i < coordinates.length; i++) {
      const coord = coordinates[i]
      if (this.grid[coord[0]][coord[1]].unit) {
        newSelect.push(this.grid[coord[0]][coord[1]].unit)
      }
    }
    if (newSelect.length > 0) {
      if (this.selectedUnits.length > 0){
        this.selectedUnits.forEach((unit) => {
          unit.selected = false;
        })
      }
      this.selectedUnits = newSelect;
      newSelect.forEach((unit) => {
        unit.selected = true;
      })
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Selector);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const findPath = (map, pathStart, pathEnd, unit) => {
  const	abs = Math.abs
	const	max = Math.max
	const	pow = Math.pow
	const	sqrt = Math.sqrt
  const grid = map
	const maxWalkableTileNum = 0
  let shortestDist = 100000;
  let closestPos;

	const gridWidth = grid[0].length
	const gridHeight = grid.length
	const gridSize =	gridWidth * gridHeight

  const DiagonalDistance = (Point, Goal) => {
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y))
	}

  const DiagonalDistanceGoal = (Point, Goal) => {
    const dist =  max(abs(Point.x - Goal.x), abs(Point.y - Goal.y))
    if (dist < shortestDist) {
      shortestDist = dist
      closestPos = Point
    }
    return dist
  }

  const Neighbours = (x, y) => {
    const	N = y - 1,
    S = y + 1,
    E = x + 1,
    W = x - 1,
    myN = N > -1 && canWalkHere(x, N),
    myS = S < gridHeight && canWalkHere(x, S),
    myE = E < gridWidth && canWalkHere(E, y),
    myW = W > -1 && canWalkHere(W, y),
    result = [];
    if(myN)
    result.push({x:x, y:N});
    if(myE)
    result.push({x:E, y:y});
    if(myS)
    result.push({x:x, y:S});
    if(myW)
    result.push({x:W, y:y});
    findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  const DiagonalNeighbors = (myN, myS, myE, myW, N, S, E, W, result) => {
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N})
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N})
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S})
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S})
		}
	}

  const findNeighbours = DiagonalNeighbors

  const canWalkHere = (x, y) => {
    return ((grid[x] != null) &&
      (grid[x][y] != null) &&
      (grid[x][y] <= maxWalkableTileNum));
  }

  const Node = (Parent, Point) => {
		const newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * gridWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode;
	}

  const calculatePath = () => {
		const	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		const mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});

    let AStar = new Array(gridSize);
    let Open = [mypathStart];
    let Closed = [];
		let result = [];
		let myNeighbours;
		let myNode;
		let myPath;
		let length, max, min, i, j;
		while(length = Open.length)
		{
			max = gridSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			myNode = Open.splice(min, 1)[0];
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				AStar = Closed = Open = [];
				result.reverse();
			}
			else
			{
				myNeighbours = Neighbours(myNode.x, myNode.y);
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						myPath.g = myNode.g + DiagonalDistance(myNeighbours[i], myNode);
						myPath.f = myPath.g + DiagonalDistanceGoal(myNeighbours[i], mypathEnd);
						Open.push(myPath);
						AStar[myPath.value] = true;
					}
				}
				Closed.push(myNode);
			}
		}
    if (result.length === 0) {
      unit.resetRally([closestPos.x, closestPos.y])
      result = findPath(grid, pathStart, [closestPos.x, closestPos.y])
    }
		return result;
	}

  return calculatePath()

}

/* harmony default export */ __webpack_exports__["a"] = (findPath);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__astar__ = __webpack_require__(3);


class Game {

  constructor(grid, pathfindingGrid) {
    this.grid = grid
    this.pathfindingGrid = pathfindingGrid
  }

  moveUnit(unit) {
    const nextPos = __WEBPACK_IMPORTED_MODULE_0__astar__["a" /* default */](this.pathfindingGrid, unit.pos, unit.ralliedPos, unit)[1]
    if (unit.timer == 0) {
      unit.move(nextPos)
      unit.timer = 5
    }
    unit.timer -= 1
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ })
/******/ ]);