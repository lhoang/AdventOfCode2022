import { range } from '../../utils/array.js'

type Item = number[] | number | Item[]

export const parseSignal = (s: string): Item => {
  return eval(s)
}

export const parseInput = (s: [string, string] | undefined): [Item, Item] => {
  return s?.map(parseSignal) as [Item, Item]
}

export const compare = (a: Item | null, b: Item | null): number => {
  // console.log('Compare '+ JSON.stringify(a) + ' vs ' + JSON.stringify(b))
  if (Array.isArray(a) && Array.isArray(b)) {
    return range(0, Math.max(a.length, b.length) - 1).reduce((acc, i) => {
      if (i > 0 && acc !== 0) return acc
      return compare(a[i] ?? null, b[i] ?? null)
    }, 0)
  } else if (Array.isArray(a) && b == null) {
    return 1
  } else if (Array.isArray(a) && b != null) {
    return compare(a, [b])
  } else if (Array.isArray(b) && a == null) {
    return -1
  } else if (Array.isArray(b) && a != null) {
    return compare([a], b)
  } else {
    if (a == null) return -1
    if (b == null) return 1

    return a == b ? 0 : +a < +b ? -1 : 1
  }
}

export const compareSignal = (a: Item, b: Item): boolean => {
  return compare(a, b) <= 0
}

export const rightOrderSum = (input: Array<[string, string]>) => {
  return input
    .map(parseInput)
    .map(([a, b], i) => [i + 1, compareSignal(a, b)])
    .filter(([_, value]) => value)
    .map(([i]) => +(i ?? 0))
    .reduce((a, b) => a + b, 0)
}

export const dividers = ['[[2]]', '[[6]]']

export const sortInput = (input: string[]): Item[] =>
  [...input, ...dividers]
    .filter(l => l.length)
    .map(parseSignal)
    .sort((a: Item, b: Item) => compare(a, b))

export const computeDecoderKey = (items: Item[]) =>
  items
    .map((c, i) => (dividers.includes(JSON.stringify(c)) ? i + 1 : 1))
    .reduce((a, b) => a * b)
