import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  findBadges,
  findSharedItem,
  sumBadgesPriorities,
  sumSharedItemsPriorities,
} from './Rucksack.js'

const realInput = readFileAsLines('2022/day03/input.txt')

const input = split`
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

describe('Rucksack', () => {
  it('should find the shared item in rucksacks', () => {
    expect(findSharedItem(input[0])).toEqual('p')

    expect(input.map(findSharedItem).join('')).toEqual('pLPvts')
  })

  it('should find the sum of the shared items priorities', () => {
    expect(sumSharedItemsPriorities(input)).toEqual(157)
  })

  it('should solve part 1 - ⭐️', () => {
    expect(sumSharedItemsPriorities(realInput)).toEqual(8243)
  })

  it('should find elves badges', () => {
    expect(findBadges(input)).toEqual(['r', 'Z'])
  })

  it('should find the sum of the badges priorities', () => {
    expect(sumBadgesPriorities(input)).toEqual(70)
  })

  it('should solve part 2 - ⭐⭐️️', () => {
    expect(sumBadgesPriorities(realInput)).toEqual(2631)
  })
})
