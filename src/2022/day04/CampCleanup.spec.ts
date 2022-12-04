import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  countContainedSections,
  countOverlappingSections,
  findFullyContainedSection,
} from './CampCleanup.js'
const realInput = readFileAsLines('2022/day04/input.txt')

const input = split`
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8

`

describe('CampCleanup', () => {
  it('should find fully contained section', () => {
    expect(findFullyContainedSection(input[0])).toBeFalsy()
    expect(findFullyContainedSection(input[1])).toBeFalsy()
    expect(findFullyContainedSection(input[3])).toBeTruthy()
    expect(findFullyContainedSection(input[4])).toBeTruthy()
  })

  it('should count the contained sections', () => {
    expect(countContainedSections(input)).toEqual(2)
  })

  it('should count the contained sections - part 1 ⭐️', () => {
    expect(countContainedSections(realInput)).toEqual(584)
  })

  it('should count the overlapping sections', () => {
    expect(countOverlappingSections(input)).toEqual(4)
  })

  it('should count the overlapping sections - part 1 ⭐️', () => {
    expect(countOverlappingSections(realInput)).toEqual(933)
  })
})
