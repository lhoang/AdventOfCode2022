import { splitByEmptyLine } from '../../utils/input.js'
import { A } from '@mobily/ts-belt'
import { transpose } from '../../utils/array.js'

export type Stack = string[]

export const parseInput = (input: string[]): [Stack[], string[]] => {
  const [stackInput = [[]], instructions = []] = splitByEmptyLine(input)
  const stacks = transpose(
    stackInput?.map(l =>
      A.splitEvery([...l], 4).map(
        crate => crate.find(c => /[A-Z]/.test(c)) ?? '',
      ),
    ) ?? [],
  ).map(l => l.filter(Boolean).reverse())

  return [stacks, instructions]
}

export const applyInstruction = (
  instruction: string,
  stacks: Stack[],
  superCrane = false,
): Stack[] => {
  const parse = /move (?<n>\d+) from (?<source>\d+) to (?<target>\d+)/

  const { groups: { n = 0, source = 0, target = 0 } = {} } =
    parse.exec(instruction) ?? {}

  if (n == undefined || source == undefined || target == undefined) return []

  const sourceStack = stacks[+source - 1]
  const crates = sourceStack?.slice(-n) ?? []
  const items = superCrane ? crates : crates.reverse()
  const newSource: Stack = sourceStack?.slice(0, -n) ?? []
  const newTarget: Stack = [...(stacks[+target - 1] ?? []), ...items]

  return stacks.map((stack, i) =>
    i == +source - 1 ? newSource : i == +target - 1 ? newTarget : stack,
  )
}

export const applyAllInstructions = (input: string[], superCrane = false) => {
  const [stacks, instructions] = parseInput(input)
  const final = instructions.reduce(
    (acc, ins) => applyInstruction(ins, acc, superCrane),
    stacks,
  )
  return final.map(stack => stack.at(-1)).join('')
}
