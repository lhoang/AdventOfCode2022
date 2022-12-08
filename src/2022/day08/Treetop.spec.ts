import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  countAllVisibleTrees,
  findBestSpot,
  getBottomTrees,
  getLeftTrees,
  getRightTrees,
  getTopTrees,
  isVisible,
  parseMap,
  scenicScore,
  takeWhile,
} from './Treetop.js'
const realInput = readFileAsLines('2022/day08/input.txt')

const input = split`
30373
25512
65332
33549
35390
`

describe('Treetop', () => {
  it('should get the top trees', () => {
    const map = parseMap(input)
    expect(getTopTrees(1, 1, map)).toEqual([0])
    expect(getTopTrees(1, 2, map)).toEqual([0, 5])
    expect(getTopTrees(2, 3, map)).toEqual([3, 5, 3])
    expect(getTopTrees(1, 0, map)).toEqual([])
  })

  it('should get the bottom trees', () => {
    const map = parseMap(input)
    expect(getBottomTrees(1, 1, map)).toEqual([5, 3, 5])
    expect(getBottomTrees(1, 2, map)).toEqual([5, 3])
    expect(getBottomTrees(2, 3, map)).toEqual([3])
    expect(getBottomTrees(1, 4, map)).toEqual([])
  })

  it('should get the left trees', () => {
    const map = parseMap(input)
    expect(getLeftTrees(1, 1, map)).toEqual([2])
    expect(getLeftTrees(1, 2, map)).toEqual([6])
    expect(getLeftTrees(2, 3, map)).toEqual([3, 3])
    expect(getLeftTrees(0, 3, map)).toEqual([])
  })

  it('should get the right trees', () => {
    const map = parseMap(input)
    expect(getRightTrees(1, 1, map)).toEqual([2, 1, 5])
    expect(getRightTrees(1, 2, map)).toEqual([2, 3, 3])
    expect(getRightTrees(2, 3, map)).toEqual([9, 4])
    expect(getRightTrees(4, 3, map)).toEqual([])
  })

  it('should check if tree is visible', () => {
    const map = parseMap(input)
    expect(isVisible(1, 1, map)).toBeTruthy()
    expect(isVisible(1, 2, map)).toBeTruthy()
    expect(isVisible(4, 2, map)).toBeTruthy()
  })

  it('should count all visible trees', () => {
    expect(countAllVisibleTrees(parseMap(input))).toEqual(21)
  })

  it('should count all visible trees - part 1 ⭐️', () => {
    expect(countAllVisibleTrees(parseMap(realInput))).toEqual(1854)
  })

  it('should take only numbers while smaller than heigth', () => {
    // expect(takeWhile(2, [1, 2, 5, 4, 1])).toEqual([1, 2, 5])
    // expect(takeWhile(5, [3, 3, 1])).toEqual([3, 3, 1])
    expect(takeWhile(5, [3, 5, 3])).toEqual([3, 5])
  })

  it('should compute scene score', () => {
    const map = parseMap(input)
    expect(scenicScore(2, 1, map)).toEqual(4)
    expect(scenicScore(2, 3, map)).toEqual(8)
  })

  it('should find the highest scenic score', () => {
    expect(findBestSpot(parseMap(input))).toEqual(8)
  })

  it('should find the highest scenic score - part 2 ⭐️⭐️', () => {
    expect(findBestSpot(parseMap(realInput))).toEqual(527340)
  })
})
