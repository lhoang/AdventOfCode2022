import { color, colors } from '../../utils/display.js'

type NodeName = string | 'E' | 'S'
export type Graph = Record<NodeName, string[]>

export interface Coord {
  x: number
  y: number
}

const serialize = ({ x, y }: Coord): string => `${x},${y}`

export const parseMap = (input: string[], start = 'S'): Graph => {
  const height = input.length
  const width = input?.[0]?.length ?? 0

  const graph = Object.fromEntries(
    input.flatMap((line, y) =>
      [...line].map((value, x) => {
        return [
          ['E', 'S'].includes(value) ? value : serialize({ x, y }),
          neighbours(x, y, input, width, height, start),
        ]
      }),
    ),
  )

  return graph
}

const getValue = (x: number, y: number, grid: string[]): string =>
  grid?.[y]?.[x] ?? ''

export function neighbours(
  x: number,
  y: number,
  grid: string[],
  width: number,
  height: number,
  start = '0,0',
) {
  const value = getValue(x, y, grid)
  return (
    [
      y > 0 ? [x, y - 1] : null,
      y < height - 1 ? [x, y + 1] : null,
      x > 0 ? [x - 1, y] : null,
      x < width - 1 ? [x + 1, y] : null,
    ].filter(Boolean) as unknown as Array<[number, number]>
  )
    .filter(([i, j]) => {
      const nodeId = serialize({ x: i, y: j })
      const v = getValue(i, j, grid)
      return (
        nodeId != start &&
        (value == 'S' ||
          (v == 'E' && value == 'z') ||
          (v != 'E' && v.charCodeAt(0) <= value.charCodeAt(0) + 1))
      )
    })
    .map(([x, y]) => (getValue(x, y, grid) == 'E' ? 'E' : serialize({ x, y })))
}

const lowestCostNode = (
  costs: Record<string, number>,
  processed: Set<string>,
) => {
  return Object.keys(costs).reduce<string | null>((lowest, node) => {
    if (!lowest || (costs?.[node] ?? 0) < (costs?.[lowest] ?? 0)) {
      if (!processed.has(node)) {
        lowest = node
      }
    }
    return lowest
  }, null)
}

export const djikstra = (
  graph: Graph,
  start = 'S',
  getPath = true,
): { distance: number; path: NodeName[] } => {
  // Init
  const costs: Record<NodeName, number> = {
    E: Infinity,
    ...Object.fromEntries(graph?.[start]?.map(s => [s, 1]) ?? []),
  }

  const parents: Record<NodeName, string | null> = {
    E: null,
  }

  graph?.[start]?.forEach(child => {
    parents[child] = start
  })

  const processed: Set<string> = new Set()

  let node = lowestCostNode(costs, processed)
  while (node) {
    const cost = costs[node] ?? 0
    graph[node]?.forEach(child => {
      const newCost = cost + 1
      if (!costs[child]) {
        costs[child] = newCost
        parents[child] = node
      }
      if ((costs?.[child] ?? 0) > newCost) {
        costs[child] = newCost
        parents[child] = node
      }
    })
    processed.add(node)
    node = lowestCostNode(costs, processed)
  }

  const optimalPath: NodeName[] = ['E']
  if (getPath) {
    let parent = parents.E
    while (parent) {
      optimalPath.push(parent)
      parent = parents[parent]
    }
  }

  return {
    distance: costs.E ?? 0,
    path: optimalPath.reverse(),
  }
}

export const display = (path: NodeName[], input: string[]) => {
  const set = new Set(path)
  const map = input
    .map((line, y) =>
      [...line]
        .map((c, x) =>
          set.has(serialize({ x, y })) ? color(c, colors.fg.red) : c,
        )
        .join(''),
    )
    .join('\n')
  console.log(map)
}

export const findShortestPath = (input: string[]) => {
  const allAs = input.flatMap(
    (line, y) =>
      [...line]
        .map((c, x) => {
          return c == 'a' ? serialize({ x, y }) : null
        })
        .filter(Boolean) as string[],
  )

  console.log(allAs.length + ' possibilities')

  const res = allAs
    .map(start => {
      const graph = parseMap(input, start)
      const d = djikstra(graph, start, false)
      return d.distance
    })
    .filter(dist => dist < Infinity)
  return Math.min(...res)
}
