import { readFileAsLines, split, splitByEmptyLine } from './input'

describe('Input utils', () => {
  it('should read file as lines', () => {
    const res = readFileAsLines('utils/test.txt')
    expect(res).toEqual(['Hello', 'World'])
  })

  it('should split in string[]', () => {
    const str = `
      hello
      world
      !
    `
    expect(split(str)).toEqual(['hello', 'world', '!'])
  })

  it('should split string[] by empty string', () => {
    const str = split`
      hello
      world
      
      Yo
      
      12345
      
    `

    expect(splitByEmptyLine(str)).toEqual([
      ['hello', 'world'],
      ['Yo'],
      ['12345'],
    ])
  })
})
