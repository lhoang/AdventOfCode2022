import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  buildRope,
  countLastKnotPositions,
  countTailPositions,
  display,
  headPath,
  moveTail,
  tailPath,
} from './RopeBridge.js'

const realInput = readFileAsLines('2022/day09/input.txt')

const input = split`
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`

const largerInput = split`
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`

describe('RopeBridge', () => {
  it('should compute Head path', () => {
    const res = headPath(input.slice(0, 4))
    expect(res).toEqual([
      [0, 0],
      [1, 0], // R 4
      [2, 0],
      [3, 0],
      [4, 0],
      [4, 1], // U 4
      [4, 2],
      [4, 3],
      [4, 4],
      [3, 4], // L 3
      [2, 4],
      [1, 4],
      [1, 3], // D 1
    ])
  })

  it('should move tail', () => {
    expect(moveTail([1, 1], [3, 1])).toEqual([2, 1])
    expect(moveTail([3, 1], [1, 1])).toEqual([2, 1])
    expect(moveTail([1, 1], [1, 3])).toEqual([1, 2])
    expect(moveTail([1, 3], [1, 1])).toEqual([1, 2])

    expect(moveTail([1, 1], [2, 3])).toEqual([2, 2])
    expect(moveTail([2, 3], [1, 1])).toEqual([1, 2])
    expect(moveTail([1, 1], [3, 2])).toEqual([2, 2])
    expect(moveTail([3, 2], [1, 1])).toEqual([2, 1])

    // should not move
    expect(moveTail([1, 1], [2, 1])).toEqual([1, 1])
  })

  it('should compute tail path', () => {
    const path = headPath(input.slice(0, 4))
    const actual = tailPath(path)
    expect(actual).toEqual([
      [0, 0],
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [3, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 3],
      [3, 4],
      [2, 4],
      [2, 4],
    ])
  })

  it('should count unique tail positions', () => {
    expect(countTailPositions(input)).toEqual(13)
  })

  it('should count unique tail positions - part1 ⭐️', () => {
    expect(countTailPositions(realInput)).toEqual(6190)
  })

  it('should display path - 1 knot', () => {
    const head = headPath(input.slice(0, 4))
    const tail = tailPath(head)
    display([head, tail])
  })

  it('should display path - 1 knot', () => {
    const head = headPath(input.slice(0, 4))
    const tail = tailPath(head)
    display([head, tail])
  })

  it('should build rope', () => {
    const rope = buildRope(largerInput, 9)
    display(rope)
  })

  it('should count last knot positions', () => {
    expect(countLastKnotPositions(largerInput, 9)).toEqual(36)
  })

  it('should count last knot positions - part 2 ⭐️⭐️', () => {
    expect(countLastKnotPositions(realInput, 9)).toEqual(2516)
  })
})
