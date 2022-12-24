import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  drawMap,
  fillSand,
  fillSandToTheTop,
  parseRocks,
  parseRocksWithFloor,
  pourSand,
  serialize,
} from './Regolith.js'
const realInput = readFileAsLines('2022/day14/input.txt')

const input = split`
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`

describe('Regolith', () => {
  it('should parse rocks and draw map', () => {
    const rocks = parseRocks(input)
    const sand = new Set(['500,8', '499,8'])
    drawMap(rocks, sand, 10, 9)
  })

  it('should pour sand', () => {
    const rocks = parseRocks(input)
    const sand = new Set<string>(['500,8', '499,8', '501,8'])
    const [x, y] = pourSand(rocks, sand, 9) ?? [0, 0]
    sand.add(serialize(x, y))
    drawMap(rocks, sand, 10, 9)
  })

  it('should fill with sand', () => {
    expect(fillSand(input, 10, 9)).toEqual(24)
  })

  it('should fill with sand - part 1 ⭐️', () => {
    expect(fillSand(realInput)).toEqual(614)
  })

  it('should parse rocks with floor and draw map', () => {
    const rocks = parseRocksWithFloor(input)
    const sand = new Set(['500,8', '499,8'])
    drawMap(rocks, sand, 20, 11)
  })

  it('should fill with sand to the Top', () => {
    expect(fillSandToTheTop(input, 20, 11)).toEqual(93)
  })

  it('should fill with sand to the Top - part 2 ⭐️⭐️', () => {
    expect(fillSandToTheTop(realInput)).toEqual(26170)
  })
})
