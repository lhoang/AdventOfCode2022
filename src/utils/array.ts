export const transpose = <T>(arr: T[][]): T[][] =>
  (arr[0]?.map((_, i) => arr.map((row: T[]) => row[i])) ?? []) as T[][]
