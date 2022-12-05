import { readFileAsLines } from '../../utils/input.js'
import {
  applyAllInstructions,
  applyInstruction,
  parseInput,
  Stack,
} from './SupplyStacks.js'
import { expect } from 'vitest'
const realInput = readFileAsLines('2022/day05/input.txt')

const input = [
  '    [D]    ',
  '[N] [C]    ',
  '[Z] [M] [P]',
  ' 1   2   3 ',
  '',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2',
]

const stack: Stack[] = [['Z', 'N'], ['M', 'C', 'D'], ['P']]

describe('SupplyStacks', () => {
  it('should parse stacks and instructions', () => {
    expect(parseInput(input)).toEqual([
      stack,
      [
        'move 1 from 2 to 1',
        'move 3 from 1 to 3',
        'move 2 from 2 to 1',
        'move 1 from 1 to 2',
      ],
    ])
  })

  it('should apply instructions', () => {
    expect(applyInstruction('move 1 from 2 to 1', stack)).toEqual([
      ['Z', 'N', 'D'],
      ['M', 'C'],
      ['P'],
    ])

    // One at a time
    expect(
      applyInstruction('move 3 from 1 to 3', [
        ['Z', 'N', 'D'],
        ['M', 'C'],
        ['P'],
      ]),
    ).toEqual([[], ['M', 'C'], ['P', 'D', 'N', 'Z']])
  })

  it('should apply all instructions', () => {
    expect(applyAllInstructions(input)).toEqual([
      ['C'],
      ['M'],
      ['P', 'D', 'N', 'Z'],
    ])
  })

  it('should apply all instructions - part 1 ⭐️', () => {
    expect(applyAllInstructions(realInput)).toEqual('VGBBJCRMN')
  })

  it('should apply all instructions with super crane - part 2 ⭐️', () => {
    const superCrane = true
    expect(applyAllInstructions(realInput, superCrane)).toEqual('LBBVJBRMH')
  })
})
