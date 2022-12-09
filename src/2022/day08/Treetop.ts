import { range, transpose } from '../../utils/array.js'

export const parseMap = (input: string[]): number[][] =>
  input.map(line => [...line].map(Number))

export const getTopTrees = (
  x: number,
  y: number,
  map: number[][],
): number[] => {
  return transpose(map)?.[x]?.slice(0, y) ?? []
}

export const getBottomTrees = (
  x: number,
  y: number,
  map: number[][],
): number[] => {
  const column = transpose(map)?.[x]
  return column?.length && y === column?.length - 1
    ? []
    : column?.slice(y - column.length + 1).reverse() ?? []
}

export const getLeftTrees = (
  x: number,
  y: number,
  map: number[][],
): number[] => {
  return map?.[y]?.slice(0, x) ?? []
}

export const getRightTrees = (
  x: number,
  y: number,
  map: number[][],
): number[] => {
  const line = map?.[y]
  return line?.length && x === line?.length - 1
    ? []
    : line?.slice(x - line.length + 1).reverse() ?? []
}

export const isVisible = (x: number, y: number, map: number[][]): boolean => {
  const height = map?.[y]?.[x] ?? 0
  return (
    getTopTrees(x, y, map).every(t => t < height) ||
    getBottomTrees(x, y, map).every(t => t < height) ||
    getLeftTrees(x, y, map).every(t => t < height) ||
    getRightTrees(x, y, map).every(t => t < height)
  )
}

export const countAllVisibleTrees = (map: number[][]): number => {
  if (!map || !map[0]) return 0

  const h = map.length
  const w = map[0].length
  return range(0, h - 1)
    .flatMap(j => range(0, w - 1).map(i => isVisible(i, j, map)))
    .filter(Boolean).length
}

export const takeWhile = (h: number, arr: number[]): number[] => {
  return arr.slice(0).reduce<number[]>((acc, current, _i, array) => {
    if (current >= h) {
      // stop immediately
      array.splice(1)
    }
    return acc.concat(current)
  }, [])
}

export const scenicScore = (x: number, y: number, map: number[][]): number => {
  const height = map?.[y]?.[x] ?? 0

  const top = takeWhile(height, getTopTrees(x, y, map).reverse()).length
  const bottom = takeWhile(height, getBottomTrees(x, y, map).reverse()).length
  const left = takeWhile(height, getLeftTrees(x, y, map).reverse()).length
  const right = takeWhile(height, getRightTrees(x, y, map).reverse()).length
  return top * bottom * left * right
}

export const findBestSpot = (map: number[][]): number => {
  if (!map || !map[0]) return 0

  const h = map.length
  const w = map[0].length
  return Math.max(
    ...range(0, h - 1).flatMap(j =>
      range(0, w - 1).map(i => scenicScore(i, j, map)),
    ),
  )
}
