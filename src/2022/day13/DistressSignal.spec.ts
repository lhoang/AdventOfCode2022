import { readFileAsLines, split, splitByEmptyLine } from '../../utils/input.js'
import { expect } from 'vitest'
import { compare, compareSignal, computeDecoderKey, parseSignal, rightOrderSum, sortInput } from './DistressSignal.js'
import dedent from 'dedent-js'

const realRawInput = readFileAsLines('2022/day13/input.txt')
const realInput: Array<[string, string]> = splitByEmptyLine(realRawInput) as Array<[string, string]>

const rawInput = split`
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`
const input: Array<[string, string]> = splitByEmptyLine(rawInput) as Array<[string, string]>

describe('DistressSignal', () => {
  it('should parse Signal', () => {
    expect(parseSignal('[1,1,3,1,1]')).toEqual([1, 1, 3, 1, 1])
    expect(parseSignal('[[1],[2,3,4]]')).toEqual([[1], [2, 3, 4]])
    expect(parseSignal('[[[]]]')).toEqual([[[]]])
  })


  // prettier-ignore
  it('should compare numbers and sizes', () => {
    expect(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toEqual(-1)
    expect(compare([1, 2, 3, 1, 1], [1, 1, 5, 1, 1])).toEqual(1)

    expect(compare([1, 1, 3, 5, 1], [1, 1, 5, 1, 1])).toEqual(-1)

    expect(compare([1, 1, 3, 1], [1, 1, 5, 1, 1])).toEqual(-1)
    expect(compare([1, 1, 3, 1], [1, 1, 3])).toEqual(1)
    expect(compare([], [1, 1, 5])).toEqual(-1)
    expect(compare([1, 1, 5], [])).toEqual(1)

    expect(compare([1], [])).toEqual(1)
  })

  // prettier-ignore
  it('should compare signal', () => {
    expect(compareSignal([[1], [2, 3, 4]], [[1], 4])).toBeTruthy()
    expect(compareSignal([9], [[8, 7, 6]])).toBeFalsy()
    expect(compareSignal([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBeTruthy()
    expect(compareSignal([7, 7, 7, 7], [7, 7, 7])).toBeFalsy()
    expect(compareSignal([], [3])).toBeTruthy()
    expect(compareSignal([[[]]], [[]])).toBeFalsy()
    expect(compareSignal([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [1, [2, [3, [4, [5, 6, 0]]]], 8, 9])).toBeFalsy()
  })

  it('should compare extra signals', () => {
    expect(compareSignal([[[[7], [2, 5], [4, 1, 10, 9]], [[], [6, 0, 2, 1], [0], [7, 0], 9], 8, [6], 9], [4, [], []], [2]], [[7], [[6, 6]]])).toBeFalsy()
    expect(compareSignal([[1, [2, [10, 8, 2, 1, 1]], 0]], [[[1]], [[[2, 4, 10, 2], []], 3, 8], [9, 3, [5, [3, 0], [0], [4]], 6, [[9, 8, 3, 7], 4, [10, 10, 8], 10, [6, 6]]], [[[3], 7, [], [10, 5]], 0], [5, [[3, 9, 0, 2, 1], 0, [4, 5, 2], [6]]]])).toBeFalsy()
    expect(compareSignal([[9, [2, 7], [[1, 8, 9]], [[5, 5, 8, 7], []]]], [[10, [6, [], 9]], [[7], [2, 2, [7, 3]], [[5, 6, 5]], 5, [1]], [3, 4, []]])).toBeTruthy()
    expect(compareSignal([], [])).toBeTruthy()
    expect(compareSignal([[1, 2], 4], [[1, 2], 3])).toBeFalsy()
    expect(compareSignal([[], 1], [[], 2])).toBeTruthy()
    expect(compareSignal([[8, [[7]]]], [[[[8], [3]]]])).toBeTruthy()
  })

  it('should compute sum of right order indices', () => {
    expect(rightOrderSum(input)).toEqual(13)
  })

  it('should compute sum of right order indices - part 1 ⭐️', () => {
    expect(rightOrderSum(realInput)).toEqual(5503)
  })

  const sorted = dedent`[]
    [[]]
    [[[]]]
    [1,1,3,1,1]
    [1,1,5,1,1]
    [[1],[2,3,4]]
    [1,[2,[3,[4,[5,6,0]]]],8,9]
    [1,[2,[3,[4,[5,6,7]]]],8,9]
    [[1],4]
    [[2]]
    [3]
    [[4,4],4,4]
    [[4,4],4,4,4]
    [[6]]
    [7,7,7]
    [7,7,7,7]
    [[8,7,6]]
    [9]`

  it('should order input', () => {
    const res = sortInput(rawInput)
    expect(res.map(c => JSON.stringify(c)).join('\n')).toEqual(sorted)
  })

  it('should find the decoder key', () => {
    expect(computeDecoderKey(sortInput(rawInput))).toEqual(140)
  })

  it('should find the decoder key - part 2 ⭐️⭐️', () => {
    expect(computeDecoderKey(sortInput(realRawInput))).toEqual(20952)
  })
})