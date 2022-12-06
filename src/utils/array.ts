export const transpose = <T>(arr: T[][]): T[][] =>
  (arr[0]?.map((_, i) => arr.map((row: T[]) => row[i])) ?? []) as T[][]

export const range = (start: number, end: number, step = 1): number[] => {
  const n = Math.ceil((end - start + 1) / step)
  return [...Array(n).keys()].map(i => start + step * i)
}
