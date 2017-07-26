class Selector {
  constructor(grid, selectedUnits) {
    this.grid = grid
    this.selectedUnits = selectedUnits

    this.selecting = false
    this.startX
    this.startY
    this.UIcanvas = document.getElementById('UIcanvas')
    this.UIctx = this.UIcanvas.getContext('2d')

    this.drawSelector = this.drawSelector.bind(this)
    this.selectorRectangle = this.selectorRectangle.bind(this)
    this.selectCells = this.selectCells.bind(this)
    this.selectUnits = this.selectUnits.bind(this)

    this.UIcanvas.addEventListener("mousedown", (target) => {
      this.drawSelector(target.x, target.y);
    })

    this.UIcanvas.addEventListener("mouseup", this.selectCells, false)

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
    let startX = 20 * Math.floor(this.startX / 20)
    let startY = 20 * Math.floor(this.startY / 20)
    let endX = 20 * Math.floor(target.x / 20)
    let endY = 20 * Math.floor(target.y / 20)
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
    for (let i = startX; i < endX; i += 20) {
      for (let n = startY; n < endY; n += 20) {
        coordinates.push([i,n])
      }
    }
    this.selectUnits(coordinates, this.grid, this.selectedUnits)
  }

  selectUnits(coordinates) {
    const newSelect = []
    for (let i = 0; i < coordinates.length; i++) {
      if (this.grid[coordinates[i]]) {
        newSelect.push(this.grid[coordinates[i]])
        this.grid[coordinates[i]].selected = true;
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

export default Selector;
