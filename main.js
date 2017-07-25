import Unit from './unit';

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
  units.push(new Unit([0,0], grid));
  units.push(new Unit([100,100], grid));



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
