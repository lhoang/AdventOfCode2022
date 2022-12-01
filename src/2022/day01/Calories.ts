import { readFileAsLines, splitByEmptyLine } from "../../utils/input.js";

const input = readFileAsLines('2022/day01/input.txt')

export const countCaloriesByElf = (input: string[]): number[] =>
  splitByEmptyLine(input)
    .map(elf => elf
      .map(i => +i)
      .reduce((a, b) => a + b)
    )

export const findMaxCalories = (elves: number[]) => Math.max(...elves)

export const part1 = () => findMaxCalories(countCaloriesByElf(input))

export const findTotalTop3 = (input: string[]): number =>
  countCaloriesByElf(input)
    .sort((a,b) => b-a)
    .slice(0, 3)
    .reduce((a,b) => a+b)

export const part2 = () => findTotalTop3(input)
