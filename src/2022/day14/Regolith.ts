import { range } from '../../utils/array.js'
import { color, colors } from '../../utils/display.js'

const { min, max } = Math

const W = 400
const H = 170

export type Point = [number, number]
type Rocks = Set<string>

const parseRocksAndMaxY = (input: string[]): [Rocks, number] => {
  const parse = (line: string): Point[] => {
    const toPoint = (s: string) => s.split(',').map(i => +i) as Point

    const points = line.split(' -> ').map(toPoint)

    return points.slice(1).flatMap((point, i) => {
      const [xA, yA] = points[i] ?? [0, 0]
      const [xB, yB] = point ?? [0, 0]
      if (xA == xB) {
        return range(min(yA, yB), max(yA, yB)).map(y => [xA, y] as Point)
      } else {
        return range(min(xA, xB), max(xA, xB)).map(x => [x, yA] as Point)
      }
    })
  }

  const rocks = input.flatMap(parse)
  const maxY = max(...rocks.map(([_, y]) => y))
  return [new Set(rocks.map(([x, y]) => serialize(x, y))), maxY]
}

export const parseRocks = (input: string[]): Rocks => {
  const [rocks] = parseRocksAndMaxY(input)
  return rocks
}

export const parseRocksWithFloor = (input: string[]): Rocks => {
  const [rocks, maxY] = parseRocksAndMaxY(input)
  range(500 - W / 2, 500 + W / 2)
    .map(x => [x, maxY + 2] as Point)
    .forEach(([x, y]) => rocks.add(serialize(x, y)))
  return rocks
}

export const serialize = (x = 500, y = 0): string => `${x},${y}`

export const drawMap = (rocks: Rocks, sand: Rocks, width = W, height = H) => {
  const map = range(0, height)
    .map(j =>
      range(500 - width / 2, 500 + width / 2)
        .map(i => {
          if (rocks.has(serialize(i, j))) {
            return color('#', colors.bg.red, colors.fg.black)
          }
          if (sand.has(serialize(i, j))) {
            return color('o', colors.fg.yellow)
          } else if (serialize(i, j) == '500,0') {
            return color('+', colors.fg.yellow)
          } else {
            return ' '
          }
        })
        .join(''),
    )
    .join('\n')

  console.log(map)
}

export const pourSand = (
  rocks: Rocks,
  sand: Rocks,
  height = H,
): Point | null => {
  const isFree = ([x, y]: Point) => {
    const current = serialize(x, y)
    return !rocks.has(current) && !sand.has(current)
  }
  // Init
  let x = 500
  let y = 0
  let blocked = false
  let fallthrough = false
  let reachedTop = false
  while (!blocked && !fallthrough && !reachedTop) {
    const free = isFree([x, y + 1])
    if (!free) {
      if (isFree([x - 1, y + 1])) {
        x--
        y++
      } else if (isFree([x + 1, y + 1])) {
        x++
        y++
      } else {
        blocked = true
        reachedTop = y == 0
      }
    } else {
      y++
      fallthrough = y >= height
    }
  }
  return fallthrough || reachedTop ? null : [x, y]
}

export const fillSand = (
  input: string[],
  width = W,
  height = H,
  parsingRock = parseRocks,
  draw = true,
) => {
  const rocks = parsingRock(input)
  const sand = new Set<string>()
  let filled = false
  let turn = 0
  while (!filled) {
    const newSand = pourSand(rocks, sand, height)
    if (newSand) {
      sand.add(serialize(newSand[0], newSand[1]))
    } else {
      filled = true
    }
    turn++
  }
  if (draw) {
    drawMap(rocks, sand, width, height)
  }
  return turn - 1
}

export const fillSandToTheTop = (input: string[], width = W, height = H) =>
  fillSand(input, width, height, parseRocksWithFloor, false) + 1
