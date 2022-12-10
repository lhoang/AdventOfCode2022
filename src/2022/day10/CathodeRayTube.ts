import { range } from '../../utils/array.js'
import { A } from '@mobily/ts-belt'
import { color, colors } from '../../utils/display.js'

export const registerTicks = (input: string[]) => {
  const init = 1
  return input.reduce(
    (register, instruction) => {
      const last = register.at(-1) ?? init

      if (instruction == 'noop') {
        return [...register, last]
      } else {
        const [_addx, value = 0] = instruction.split(' ').map(Number)
        return [...register, last, last + value]
      }
    },
    [init],
  )
}

export const signalStrength = (register: number[]): number[] =>
  range(20, register.length, 40).map(
    cycle => cycle * (register[cycle - 1] ?? 0),
  )

export const signalStrengthSum = (input: string[]): number =>
  signalStrength(registerTicks(input)).reduce((a, b) => a + b)

export const display = (register: number[]) => {
  const lines = A.splitEvery(register.slice(0, 240), 40)

  const displayLine = (line: readonly number[]) =>
    line
      .map((value, i) =>
        [value - 1, value, value + 1].includes(i) ? '▓' : ' ',
      )
      .join('')

  const crt = lines.map(displayLine).join('\n')
  console.log(color(crt, colors.fg.green))
}
