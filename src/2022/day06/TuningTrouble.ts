import { range } from '../../utils/array.js'

export const findMarker = (s: string, distinct = 4): number => {
  const same = /(.).*\1/
  return (
    range(distinct, s.length).find(i => !same.test(s.slice(i - distinct, i))) ??
    -1
  )
}
