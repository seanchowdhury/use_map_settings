import findPath from './astar'

class Game {

  constructor(grid, pathfindingGrid) {
    this.grid = grid
    this.pathfindingGrid = pathfindingGrid
  }

  moveUnit(unit) {
    const nextPos = findPath(this.pathfindingGrid, unit.pos, unit.ralliedPos)[1]
    if (unit.timer == 0) {
      unit.move(nextPos)
      unit.timer = 30
    }
    unit.timer -= 1
  }

}

export default Game
