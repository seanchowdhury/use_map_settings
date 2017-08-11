class Unit {
  constructor(spawnPos, grid, pathfindingGrid) {
    this.pos = spawnPos;
    grid[spawnPos[0]][spawnPos[1]].unit = this
    grid[spawnPos[0]][spawnPos[1]].path = 1
    pathfindingGrid[spawnPos[0]][spawnPos[1]] = 1
    this.ralliedPos = false;
    this.selected = false
    this.timer = 30
  }

  move(nextPos) {
    this.pos[0] = nextPos[0]
    this.pos[1] = nextPos[1]
    if (this.pos[0] === this.ralliedPos[0] && this.pos[1] === this.ralliedPos[1]) {
      this.ralliedPos = false;
    }
  }
}

export default Unit;
