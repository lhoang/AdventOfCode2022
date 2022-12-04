import { A } from '@mobily/ts-belt'

export const findSharedItem = (s: string | undefined): string => {
  if (!s) return ''
  const s1 = s.slice(0, s.length / 2)
  const s2 = s.slice(s.length / 2)

  return [...s1].find(c => s2.includes(c)) ?? ''
}

const getPriorities = (c: string) =>
  /[a-z]/.test(c)
    ? c.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    : c.charCodeAt(0) - 'A'.charCodeAt(0) + 27

export const sumSharedItemsPriorities = (input: string[]): number =>
  input
    .map(findSharedItem)
    .map(getPriorities)
    .reduce((a, b) => a + b)

export const findBadges = (input: string[]): string[] => {
  return A.splitEvery(input, 3).map(
    ([a = '', b = '', c = '']) =>
      [...a].find(i => b.includes(i) && c.includes(i)) ?? '',
  )
}

export const sumBadgesPriorities = (input: string[]): number =>
  findBadges(input)
    .map(getPriorities)
    .reduce((a, b) => a + b)
