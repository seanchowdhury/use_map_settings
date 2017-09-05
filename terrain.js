class Terrain {
  constructor(terrainDetails, grid, pathfindingGrid) {
    this.terrainDetails = terrainDetails
    this.pathfindingGrid = pathfindingGrid
    this.grid = grid
    for (let i = 0; i < terrainDetails.length; i++) {
      grid[terrainDetails[i].x][terrainDetails[i].y].path = 1
      pathfindingGrid[terrainDetails[i].x][terrainDetails[i].y] = 1
    }
  }




}
