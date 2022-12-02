const wins = ['Rock Paper', 'Paper Scissors', 'Scissors Rock']
const loses = ['Rock Scissors', 'Paper Rock', 'Scissors Paper']

export const lineScore = (s: string) => {
  const map = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors',
  }

  if (!s) return 0
  const line = s
    .trim()
    .split(' ')
    .map(c => map[c])
  const [p1, p2] = line
  const result = wins.includes(line.join(' ')) ? 6 : p1 === p2 ? 3 : 0
  const shape = p2 === 'Scissors' ? 3 : line[1] === 'Paper' ? 2 : 1
  return result + shape
}

export const totalScore = (input: string[], method = lineScore) =>
  input.map(method).reduce((a, b) => a + b)

export const chooseShape = (s: string) => {
  const p1map = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
  }
  if (!s) return 0
  const line = s
    .trim()
    .split(' ')
    .map(c => p1map[c] ?? c)
  const [p1, instruction] = line
  let p2: string
  let results = 0
  switch (instruction) {
    case 'Z':
      p2 = wins.find(w => w.startsWith(p1)).split(' ')[1]
      results = 6
      break
    case 'Y':
      p2 = p1
      results = 3
      break
    case 'X':
      p2 = loses.find(w => w.startsWith(p1)).split(' ')[1]
  }

  const shape = p2 === 'Scissors' ? 3 : p2 === 'Paper' ? 2 : 1
  return results + shape
}
