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

export default Unit;
