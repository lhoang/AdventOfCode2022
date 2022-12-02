import {
  computeFloor,
  findBasementInstruction,
  part1,
  part2,
} from './NotQuiteLisp.js'
import { expect } from 'vitest'

describe('Day 01 - Not Quite Lisp', () => {
  it('should compute the floor', () => {
    expect(computeFloor('(()(()(')).toEqual(3)
    expect(computeFloor(')())())')).toEqual(-3)
  })

  it('should compute part 1', () => {
    expect(part1()).toEqual(138)
  })

  it('should find the first basement instruction', () => {
    expect(findBasementInstruction('()())')).toEqual(5)
    expect(findBasementInstruction(')')).toEqual(1)
  })

  it('should compute part 2', () => {
    expect(part2()).toEqual(1771)
  })
})
