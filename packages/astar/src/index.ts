interface Point {
  x: number,
  y: number,
}

interface Node extends Point {
  cost: number,
  weightedHeuristic: number, // cost + (distance * weight)
}

// TODO: this is duplicated with engine/utils.ts
const pointExists = (points: Point[][]) => ({ x, y }: Point): boolean => !!(points[y] && points[y][x])
const getAroundArea = ({ x, y }: Point) => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x: (y % 2 === 1 ? x + 1 : x - 1), y: y - 1 },
  { x, y: y + 1 },
  { x: (y % 2 === 1 ? x + 1 : x - 1), y: y + 1 },
]
// !END TODO: duplicated
const getNodeAt = (points: Point[][]) => ({ x, y }: Point) => {
  if (!points[y]) return undefined
  return points[y][x]
}
const isSamePoint = (pointA: Point) => (pointB: Point) => (pointA.x === pointB.x && pointA.y === pointB.y)
const getNeighborsPoints = (grid: Point[][]) => (point: Point) => (
  getAroundArea(point)
    .map(getNodeAt(grid))
    .filter(Boolean)
)

export const getShortestPath = (grid: Point[][], start: Point, end: Point, getWeight: (point: Point) => number): Point[] => {
  const closedNodes: Node[] = []
  const openNodes: Node[] = []

  const addToOpenNodes = (node: Node) => {
    openNodes.push(node)
    openNodes.sort((nodeA, nodeB) => nodeB.weightedHeuristic - nodeA.weightedHeuristic)
  }

  const getDistanceToEnd = (point: Point) => {
    return (point.x - end.x) ** 2 + (point.y - end.y) ** 2
  }

  const getPath = () => {
    let nextNodes = closedNodes
    let nextPoint = nextNodes.find(isSamePoint(end)) as Node

    if (nextPoint.weightedHeuristic === Infinity) return []

    const path = []

    while (nextPoint && !isSamePoint(nextPoint)(start)) {
      path.push(nextPoint)

      nextPoint = getAroundArea(nextPoint)
        .map(point => nextNodes.find(isSamePoint(point)))
        .filter(point => !!(point && point.cost < nextPoint.cost))
        .sort((nodeA, nodeB) => (nodeB as Node).cost - (nodeA as Node).cost)
        .pop() as Node
    }

    if (!nextPoint) return []

    return path
  }

  if (!pointExists(grid)(start)) throw new Error('Starting point not found in given grid')
  const startNode = {
    ...getNodeAt(grid)(start) as Point,
    cost: 0,
    weightedHeuristic: 0,
  }
  addToOpenNodes(startNode)
  closedNodes.push(startNode)

  while (openNodes.length > 0) {
    const nextNode = openNodes.pop()
    if (!nextNode) return []

    // end
    if (isSamePoint(nextNode)(end)) return getPath().reverse().map(({ x, y }) => ({ x, y }))

    const newNodes = getNeighborsPoints(grid)(nextNode)
    newNodes.forEach(newPoint => {
      if (!newPoint) return
      const newCost = nextNode.cost + 1 + getWeight(nextNode)

      const closedNode = closedNodes.find(isSamePoint(newPoint))
      if (closedNode && closedNode.cost < newCost) return

      const openNode = openNodes.find(isSamePoint(newPoint))
      if (openNode && openNode.cost < newCost) return

      const distance = getDistanceToEnd(newPoint)
      const newNode = {
        ...newPoint,
        cost: newCost,
        weightedHeuristic: newCost + (distance * 1),
      }
      if (openNode) Object.assign(openNode, newNode)
      else if (closedNode) Object.assign(closedNode, newNode)
      else {
        addToOpenNodes(newNode)
        closedNodes.push(newNode)
      }
    })
  }

  return []
}
