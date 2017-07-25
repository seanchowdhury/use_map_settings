class Unit {
  constructor(spawnPos, grid) {
    this.pos = spawnPos;
    grid[spawnPos] = this
    this.selected = false;
  }
}

export default Unit;
