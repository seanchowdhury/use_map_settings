class Unit {
  constructor(spawnPos, grid, pathfindingGrid) {
    this.pos = spawnPos;
    grid[spawnPos[0]][spawnPos[1]].unit = this
    grid[spawnPos[0]][spawnPos[1]].path = 1
    pathfindingGrid[spawnPos[0]][spawnPos[1]] = 1
    this.selected = false;
  }
}

export default Unit;
