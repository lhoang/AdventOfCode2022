import { expect } from 'vitest'
import { readFileAsLines, split } from '../../utils/input.js'
import { chooseShape, lineScore, totalScore } from './RockPaperScissors.js'

const realInput = readFileAsLines('2022/day02/input.txt')

const input = split`
A Y
B X
C Z
`

const input2 = split`
C X
B Y
C Z
C Z
B X
C Z

`


describe('Rock Paper Scissors', () => {
  it('should compute the line score', () => {
    expect(lineScore(input[0])).toEqual(8)
    expect(lineScore(input[1])).toEqual(1)
    expect(lineScore(input[2])).toEqual(6)
    expect(lineScore('')).toEqual(0)
  })

  it('should compute the total score', () => {
    expect(totalScore(input)).toEqual(15)
    expect(totalScore(input2)).toEqual(31)
  })

  it('should compute the total score ⭐️', () => {
    expect(totalScore(realInput)).toEqual(13221)
  })

  it('should compute the line score after choosing shape', () => {
    expect(chooseShape(input[0])).toEqual(4)
    expect(chooseShape(input[1])).toEqual(1)
    expect(chooseShape(input[2])).toEqual(7)
    expect(chooseShape('')).toEqual(0)
  })

  it('should compute the total score after choosing shape', () => {
    //expect(totalScore(input, chooseShape)).toEqual(12)
    expect(totalScore(input2, chooseShape)).toEqual(29)
  })

  it('should compute the total score ⭐️', () => {
    expect(totalScore(realInput, chooseShape)).toEqual(13131)
  })

})