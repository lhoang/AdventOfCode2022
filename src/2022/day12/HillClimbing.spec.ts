import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  display,
  djikstra,
  findShortestPath,
  neighbours,
  parseMap,
} from './HillClimbing.js'
const realInput = readFileAsLines('2022/day12/input.txt')

const input = split`
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`

describe('HillClimbing', () => {
  it('should parse map', () => {
    const graph = parseMap(input)
    expect(graph['S']).toEqual(['0,1', '1,0'])
  })

  it('should check neighbours', () => {
    expect(neighbours(0, 0, input, 8, 5)).toEqual(['0,1', '1,0'])
    expect(neighbours(6, 3, input, 8, 5)).toEqual(['6,2', '6,4', '5,3', '7,3'])
    expect(neighbours(4, 2, input, 8, 5)).toEqual(['4,1', '4,3', '3,2', 'E'])
    expect(neighbours(3, 4, input, 8, 5)).toEqual(['2,4', '4,4'])
    expect(neighbours(5, 3, input, 8, 5)).toEqual(['5,4', '4,3', '6,3'])
  })

  it('should find shortest path from S', () => {
    const graph = parseMap(input)
    const dijks = djikstra(graph)
    display(dijks.path, input)
    expect(dijks.distance).toEqual(31)
  })

  it('should solve and find shortest path from S - part 1 ⭐️', () => {
    const graph = parseMap(realInput)
    const dijks = djikstra(graph)
    display(dijks.path, realInput)
    expect(dijks.distance).toEqual(520)
  })

  it('should find shortest path from a', () => {
    expect(findShortestPath(input)).toEqual(29)
  })

  it('should find shortest path from a - Part 2 ⭐️⭐️', () => {
    expect(findShortestPath(realInput)).toEqual(508)
  })
})
