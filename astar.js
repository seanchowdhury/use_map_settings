const findPath = (map, pathStart, pathEnd, unit) => {
  const	abs = Math.abs
	const	max = Math.max
	const	pow = Math.pow
	const	sqrt = Math.sqrt
  const grid = map
	const maxWalkableTileNum = 0
  let shortestDist = 100000
  let closestPos

	const gridWidth = grid[0].length
	const gridHeight = grid.length
	const gridSize =	gridWidth * gridHeight

  const DiagonalDistance = (Point, Goal) => {
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y))
	}

  const DiagonalDistanceGoal = (Point, Goal) => {
    const dist =  max(abs(Point.x - Goal.x), abs(Point.y - Goal.y))
    if (dist < shortestDist) {
      shortestDist = dist
      closestPos = Point
    }
    return dist
  }

  const Neighbours = (x, y) => {
    const	N = y - 1,
    S = y + 1,
    E = x + 1,
    W = x - 1,
    myN = N > -1 && canWalkHere(x, N),
    myS = S < gridHeight && canWalkHere(x, S),
    myE = E < gridWidth && canWalkHere(E, y),
    myW = W > -1 && canWalkHere(W, y),
    result = []
    if(myN)
    result.push({x:x, y:N})
    if(myE)
    result.push({x:E, y:y})
    if(myS)
    result.push({x:x, y:S})
    if(myW)
    result.push({x:W, y:y})
    findNeighbours(myN, myS, myE, myW, N, S, E, W, result)
    return result
  }

  const DiagonalNeighbors = (myN, myS, myE, myW, N, S, E, W, result) => {
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N})
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N})
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S})
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S})
		}
	}

  const findNeighbours = DiagonalNeighbors

  const canWalkHere = (x, y) => {
    return ((grid[x] != null) &&
      (grid[x][y] != null) &&
      (grid[x][y] <= maxWalkableTileNum));
  }

  const Node = (Parent, Point) => {
		const newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * gridWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode
	}

  const calculatePath = () => {
		const	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]})
		const mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]})

    let AStar = new Array(gridSize)
    let Open = [mypathStart]
    let Closed = []
		let result = []
		let myNeighbours
		let myNode;
		let myPath;
		let length, max, min, i, j;
		while(length = Open.length)
		{
			max = gridSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			myNode = Open.splice(min, 1)[0];
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				AStar = Closed = Open = [];
				result.reverse();
			}
			else
			{
				myNeighbours = Neighbours(myNode.x, myNode.y);
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						myPath.g = myNode.g + DiagonalDistance(myNeighbours[i], myNode);
						myPath.f = myPath.g + DiagonalDistanceGoal(myNeighbours[i], mypathEnd);
						Open.push(myPath);
						AStar[myPath.value] = true;
					}
				}
				Closed.push(myNode);
			}
		}
    if (result.length === 0) {
      unit.resetRally([closestPos.x, closestPos.y])
      result = findPath(grid, pathStart, [closestPos.x, closestPos.y])
    }
		return result;
	}

  return calculatePath()

}

export default findPath
