import { range, transpose } from '../../utils/array.js'
import { A } from '@mobily/ts-belt'
import { color, colors } from '../../utils/display.js'

export type Point = [number, number]

export const headPath = (input: string[]): Point[] => {
  const parse = (s: string): Point[] => {
    const [dir, step = 0] = s.split(' ')
    let move: Point[] = []
    switch (dir) {
      case 'U':
        move = range(1, +step).map(i => [0, i])
        break
      case 'D':
        move = range(1, +step).map(i => [0, -i])
        break
      case 'L':
        move = range(1, +step).map(i => [-i, 0])
        break
      case 'R':
        move = range(1, +step).map(i => [i, 0])
        break
      default:
      // nothing
    }
    return move
  }

  const start: Point = [0, 0]
  return input.reduce<Point[]>(
    (acc, instruction) => {
      const [x, y] = acc.at(-1) ?? start
      const moves: Point[] = parse(instruction).map(([dx, dy]) => [
        x + dx,
        y + dy,
      ])

      return [...acc, ...moves]
    },
    [start],
  )
}

export const moveTail = ([xT, yT]: Point, [xH, yH]: Point): Point =>
  Math.hypot(xH - xT, yH - yT) > Math.sqrt(2)
    ? [xT + Math.sign(xH - xT), yT + Math.sign(yH - yT)]
    : [xT, yT]

export const tailPath = (headPath: Point[]) => {
  const start: Point = [0, 0]

  return headPath.reduce<Point[]>((acc, head) => {
    const last = acc.at(-1) ?? start
    return [...acc, moveTail(last, head)]
  }, [])
}

export const countTailPositions = (input: string[]): number => {
  const path = tailPath(headPath(input))

  const positions = new Set(path.map(([x, y]) => `${x};${y}`))

  return positions.size
}

export const display = (rope: Array<Point[]>): void => {
  const head = rope?.[0] ?? []
  const [headXs, headYs] = A.unzip(head)
  const minX = Math.min(...headXs)
  const maxX = Math.max(...headXs)
  const minY = Math.min(...headYs)
  const maxY = Math.max(...headYs)

  const createGrid = (positions: Point[], pattern?: string) => {
    const grid = range(minY, maxY).map(_ => range(minX, maxX).map(_ => '.'))
    // @ts-expect-error: don't know how to bypass
    grid[0 - minY][0 - minX] = 's'
    positions.forEach(([x, y], i) => {
      // @ts-expect-error: don't know how to bypass
      grid[y - minY][x - minX] = pattern ?? '' + (i || 'H')
    })
    return grid
  }

  transpose(rope).forEach((pos, step) => {
    const grid = createGrid(pos)
    console.log(color('Step ' + step, colors.bg.green))
    console.log(
      grid
        .reverse()
        .map(line => line.join(''))
        .join('\n'),
    )
    console.log('\n\n')
  })

  console.log(color('Last Knot ', colors.bg.green))
  const lastKnot = rope.at(-1) ?? []
  console.log(
    createGrid(lastKnot, '#')
      .reverse()
      .map(line => line.join(''))
      .join('\n'),
  )
}

export const buildRope = (input: string[], n: number): Array<Point[]> => {
  const head = headPath(input)
  return range(1, n).reduce(
    acc => {
      const previous = acc.at(-1) ?? head
      return [...acc, tailPath(previous)]
    },
    [head],
  )
}

export const countLastKnotPositions = (input: string[], n: number): number => {
  const rope = buildRope(input, n)
  const lastKnot = rope.at(-1) ?? []
  const positions = new Set(lastKnot.map(([x, y]) => `${x};${y}`))
  return positions.size
}
