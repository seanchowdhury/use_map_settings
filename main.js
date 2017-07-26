import Unit from './unit'
import Selector from './selector'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const grid = {}
  for (let i = 0; i < canvas.width; i += 20) {
    for (let n = 0; n < canvas.height; n += 20) {
      grid[[i,n]] = 0
    }
  }
  const units = []
  const selectedUnits = []
  units.push(new Unit([220,400], grid))
  units.push(new Unit([100,100], grid))
  debugger
  const selector = new Selector(grid, selectedUnits)

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
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
    ctx.stroke()
  }
  for (let n = 0; n < canvas.height; n += 20) {
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
    ctx.fillRect(units[i].pos[0], units[i].pos[1], 20, 20)
  }
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60)
  };
})();
