import { readFileAsLines, split, splitByEmptyLine } from '../../utils/input.js'
import { monkeyBusiness, parseMonkey, play, playRound } from './Monkey.js'
import { expect } from 'vitest'
const realInput = readFileAsLines('2022/day11/input.txt')

const input = split`
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`

describe('Monkey', () => {
  it('should parse Monkey', () => {
    const monkeys = splitByEmptyLine(input)

    const monkey = parseMonkey(monkeys[1])
    expect(monkey.id).toEqual(1)
    expect(monkey.items).toEqual([54, 65, 75, 74])
    expect(monkey.op(5)).toEqual(11)
    expect(monkey.test(38)).toEqual(2)
    expect(monkey.test(39)).toEqual(0)
  })

  it('should run monkey round', () => {
    const monkeys = splitByEmptyLine(input)
    const monkey = parseMonkey(monkeys[2])

    const targets = monkey.round()
    expect(targets).toEqual({
      '1' : [2080],
      '3' : [1200, 3136]
    })
    expect(monkey.inspectedItems).toEqual(3)
    expect(monkey.items).toHaveLength(0)
  })

  it('should play 2 rounds', () => {
    const monkeys = splitByEmptyLine(input).map(parseMonkey)
    playRound(monkeys)
    expect(monkeys.map(m => m.items)).toEqual([
      [20, 23, 27, 26],
      [2080, 25, 167, 207, 401, 1046],
      [],
      []
    ])
    playRound(monkeys)
    expect(monkeys.map(m => m.items)).toEqual([
      [695, 10, 71, 135, 350],
      [43, 49, 58, 55, 362],
      [],
      []
    ])
  })

  it('should play 20 rounds', () => {
    const monkeys = play(input, 20)

    expect(monkeys.map(m => m.items)).toEqual([
      [10, 12, 14, 26, 34],
      [245, 93, 53, 199, 115],
      [],
      []
    ])
    expect(monkeyBusiness(monkeys)).toEqual(10605)
  })

  it('should play 20 rounds - part 1 ⭐️', () => {
    const monkeys = play(realInput, 20)
    expect(monkeyBusiness(monkeys)).toEqual(316888)
  })

  it('should play 20 rounds - part 2 ⭐️', () => {
    const monkeys = play(input, 20, false)
    expect(monkeys.map(m => m.inspectedItems)).toEqual([])
    expect(monkeyBusiness(monkeys)).toEqual(2_713_310_158)
  })

})