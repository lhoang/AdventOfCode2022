import { A, pipe } from '@mobily/ts-belt'
import { splitByEmptyLine } from '../../utils/input.js'
import { range } from '../../utils/array.js'

export class Monkey {
  id: number
  items: number[]
  op: (x: number) => number
  test: (x: number) => number
  inspectedItems: number = 0

  constructor(id: number,
              items: number[],
              op: (x: number) => number,
              test: (x: number) => number,) {
    this.id= id
    this.items = items
    this.op = op
    this.test = test
  }

  addItems(newItems: number[] | undefined) {
    this.items.push(...(newItems ?? []))
  }

  round(relief = true) {
    const grouped = pipe(
      this.items.map(this.op),
      A.map(i => relief ? Math.floor(i/ 3) : i),
      A.map(i => ({ target: this.test(i), item: i })),
      A.groupBy(a => a.target)
    )

    this.inspectedItems += this.items.length
    this.items = []

    return Object.fromEntries(Object.entries(grouped)
      .map(([k, items]) => [k, items?.map(v => v.item)]))
  }
}

export const parseMonkey = (monkey: string[] | undefined) => {
  const id = monkey?.[0]?.split(' ').map(c => +c.replace(':',''))[1] ?? 0
  const items =( monkey?.[1]?.split(':')[1] ?? '')
        .split(/, ?/).map(Number)

  const getNum = (index: number) => +(/.* (\d+)$/.exec(monkey?.[index] ?? '')?.[1] ?? 0)

  const opNum = getNum(3)
  const trueNum = getNum(4)
  const falseNum = getNum(5)
  const test = (x: number) => x % opNum == 0 ? trueNum : falseNum

  const [_old, operator, b=0] = (monkey?.[2]?.split('= ')?.[1] ?? 'old + 0')
    .split(' ')

  let op: (x: number) => number
  if (b == 'old') {
    op = (x: number) => x * x
  } else {
    const arg = +b
    switch (operator) {
      case '+':
        op = (x: number) => x + arg
        break
      case '-':
        op = (x: number) => x - arg
        break
      case '*':
        op = (x: number) => x * arg
        break
      case '/':
        op = (x: number) => x / arg
        break
      default:
        throw new Error('unknow op: ' + operator)
    }
  }

  return new Monkey(id, items, op, test)
}

export const playRound = (monkeys: Monkey[], relief = true) => {
  monkeys.map(monkey => {
    const targets = monkey.round(relief)
    Object.entries(targets)
      .forEach( ([id, items]) =>monkeys?.[+id]?.addItems(items))
  })
}

export const play = (input: string[], rounds: number, relief = true): Monkey[] => {
  const monkeys = splitByEmptyLine(input).map(parseMonkey)
  range(1, rounds).forEach(_ => playRound(monkeys, relief))
  return monkeys
}

export const monkeyBusiness = (monkeys: Monkey[]): number => {
  const mostActives = monkeys.map(m => m.inspectedItems)
    .sort((a, b) => b - a)
  return (mostActives?.[0] ?? 0) *  (mostActives?.[1] ?? 0)
}
