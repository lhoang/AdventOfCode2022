import { range } from './array.js'
describe('Array utils', () => {
  it('should generate range', () => {
    expect(range(2, 5)).toEqual([2, 3, 4, 5])
    expect(range(2, 5, 2)).toEqual([2, 4])
  })
})
