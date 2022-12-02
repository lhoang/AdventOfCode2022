import { split } from '../../utils/input.js'
import {
  countCaloriesByElf,
  findMaxCalories,
  findTotalTop3,
  part1,
  part2,
} from './Calories.js'
import { expect } from 'vitest'

describe('Calories', () => {
  const test = split`
    1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`

  it('should count Calories by elf', () => {
    expect(countCaloriesByElf(test)).toEqual([6000, 4000, 11000, 24000, 10000])
  })

  it('should find the max calories', () => {
    expect(findMaxCalories(countCaloriesByElf(test))).toEqual(24000)
  })

  it('should solve part 1', () => {
    expect(part1()).toEqual(66306)
  })

  it('should find the total calories of the top 3', () => {
    expect(findTotalTop3(test)).toEqual(45000)
  })

  it('should solve part 2', () => {
    expect(part2()).toEqual(195292)
  })
})
