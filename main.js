import Unit from './unit'
import Selector from './selector'
import findPath from './astar'

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

  const units = []
  const selectedUnits = []
  units.push(new Unit([25,25], grid, pathfindingGrid))
  units.push(new Unit([5,5], grid, pathfindingGrid))
  console.log(findPath(pathfindingGrid, [0,0], [5,5]))
  const selector = new Selector(grid, selectedUnits, cellSize)
  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid(ctx, canvas)
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
