import Unit from './unit'
import Selector from './selector'
import findPath from './astar'
import Game from './game.js'

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
  const game = new Game(grid, pathfindingGrid)
  const units = []
  const selectedUnits = []
  units.push(new Unit([25,25], grid, pathfindingGrid))
  units.push(new Unit([5,5], grid, pathfindingGrid))
  units.push(new Unit([50,50], grid, pathfindingGrid))
  units.push(new Unit([15,52], grid, pathfindingGrid))
  units.push(new Unit([52,35], grid, pathfindingGrid))
  units.push(new Unit([79,35], grid, pathfindingGrid))
  const selector = new Selector(grid, pathfindingGrid, selectedUnits, cellSize)
  const terrainDetails = { }
  const terrain = new Terrain(terrainDetails, grid, pathfindingGrid)

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

const drawTerrain = (ctx, terrainDetails) => {
  for(let i = 0; i < terrainDetails.length; i++) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(terrainDetails[i].x * cellSize, terrainDetails[i].y * cellSize, cellSize, cellSize)
  }
}
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60)
  };
})();
