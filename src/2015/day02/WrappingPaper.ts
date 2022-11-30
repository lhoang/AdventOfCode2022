import { readFileAsLines } from "../../utils/input.js";

export const neededPaper = s => {
  const [l, w, h] = s.split`x`.map(i => +i)
    .sort( (a,b) => a-b)
  return 2*l*w + 2*w*h + 2*h*l +l*w
}

export const needRibbon = s => {
  const [l, w, h] = s.split`x`.map(i => +i)
    .sort( (a,b) => a-b)
  return 2*l+ 2*w + l*w*h
}

export function part1(): number {
  return readFileAsLines('2015/day02/input.txt')
    .map(neededPaper)
    .reduce( (a,b) => a+b)
}

export function part2(): number {
  return readFileAsLines('2015/day02/input.txt')
    .map(needRibbon)
    .reduce( (a,b) => a+b)
}


