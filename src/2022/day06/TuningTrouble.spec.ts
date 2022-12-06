import { readFile } from '../../utils/input.js'
import { expect } from 'vitest'
import { findMarker } from './TuningTrouble.js'

const realInput = readFile('2022/day06/input.txt')

describe('TuningTrouble', () => {
  it('should find marker', () => {
    expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
    expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
  })

  it('should find marker - part 1 ⭐️', () => {
    expect(findMarker(realInput)).toEqual(1480)
  })

  it('should find message marker', () => {
    expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toEqual(19)
    expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toEqual(29)
  })

  it('should find marker - part 2 ⭐️', () => {
    expect(findMarker(realInput, 14)).toEqual(2746)
  })
})
