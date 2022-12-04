const range = (s: string | undefined) => {
  const [start, end] = s?.split('-')?.map(i => +i) ?? []
  if (!start || !end) return []
  return [...Array(end - start + 1).keys()].map(i => i + start)
}

export const findFullyContainedSection = (s: string | undefined) => {
  if (!s) return false
  const [s1, s2] = s.split(',')
  const range1 = range(s1)
  const range2 = range(s2)

  return (
    range1.every(i => range2.includes(i)) ||
    range2.every(i => range1.includes(i))
  )
}

export const countContainedSections = (input: string[]) =>
  input.filter(findFullyContainedSection).length

const findOverlappingSection = (s: string | undefined) => {
  if (!s) return false
  const [s1, s2] = s.split(',')
  const range1 = range(s1)
  const range2 = range(s2)

  return range1.some(i => range2.includes(i))
}

export const countOverlappingSections = (input: string[]) =>
  input.filter(findOverlappingSection).length
