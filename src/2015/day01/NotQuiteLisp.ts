import { readFile } from '../../utils/input.js'

export function computeFloor(s: string): number {
  return s.split('').reduce((acc, c) => acc + (c === '(' ? 1 : -1), 0)
}

export function part1(): number {
  return computeFloor(readFile('2015/day01/input.txt'))
}

export function findBasementInstruction(s: string): number {
  const instructions = s.split('')
  const baseRec = (i, floor) =>
    floor == -1 ? i : baseRec(i + 1, floor + (instructions[i] === '(' ? 1 : -1))

  return baseRec(0, 0)
}

export function part2(): number {
  return findBasementInstruction(readFile('2015/day01/input.txt'))
}
