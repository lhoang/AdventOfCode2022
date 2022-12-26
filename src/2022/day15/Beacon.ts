import { range } from '../../utils/array.js'
import { color, colors } from '../../utils/display.js'
import { A } from '@mobily/ts-belt'

export type Point = [number, number]
export type Pos = Set<string>
const { min, max, abs } = Math

export const parseSensorAndBeacon = (s: string): [Point, Point] => {
  const regex = /Sensor at x=(?<xS>[\d-]+), y=(?<yS>[\d-]+): closest beacon is at x=(?<xB>[\d-]+), y=(?<yB>[\d-]+)/
  const { groups: { xS = 0, yS = 0, xB = 0, yB = 0 } = {} } = regex.exec(s) ?? {}
  return [[+xS, +yS], [+xB, +yB]]
}

export const getSensorsAndBeacons = (input: string[]) =>
  input.map(parseSensorAndBeacon)


export const distance = ([xA, yA]: Point, [xB, yB]: Point): number =>
  abs(xA - xB) + abs(yA - yB)

export interface Size {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export const size = (points: Point[]): Size =>
  points.reduce((acc, [x, y]) => ({
    minX: min(x, acc.minX),
    maxX: max(x, acc.maxX),
    minY: min(y, acc.minY),
    maxY: max(y, acc.maxY),
  }), { minX: +Infinity, maxX: -Infinity, minY: +Infinity, maxY: -Infinity })

export const computeNoBeacon = (sensor: Point | undefined, beacon: Point | undefined): Point[] => {
  if (sensor == undefined || beacon == undefined) throw new Error('Sensor or beacon undefined')

  const [xS, yS] = sensor
  const dist = distance(sensor, beacon)
  return range(yS - dist, yS + dist).flatMap((y, i) => {
      const width = y <= yS ? i : 2 * dist - i
      return range(xS - width, xS + width)
        .map(x => [x, y] as Point)
    },
  )
}


export const toPos = (array: readonly Point[]) =>
  new Set(array.map(([x, y]) => `${x},${y}`))

const serialize = (x = 0, y = 0): string => `${x},${y}`


export const display = (beacons: Pos, sensors: Pos, noBeacon: Pos, size: Size) => {
  const offset = 10

  const map = range(size.minY - offset, size.maxY + offset)
    .map(j =>
      range(size.minX - offset, size.maxX + offset)
        .map(i => {
          if (beacons.has(serialize(i, j))) {
            return color('B', colors.fg.red)
          }
          if (sensors.has(serialize(i, j))) {
            return color('S', colors.fg.yellow)
          } else if (noBeacon.has(serialize(i, j))) {
            return color('#', colors.bg.green)
          } else {
            return ' '
          }
        })
        .join(''),
    )
    .join('\n')

  console.log(map)
}

/**
 * Does not scale at all...
 */
export const computeNoBeaconZoneNaiveWay = (input: string[], displayMap = false) => {
  const sensorsAndBeacons = getSensorsAndBeacons(input)
  const s = size(sensorsAndBeacons.flatMap(([a,b]) => [a,b]))
  const [sensorsPt, beaconsPt] = A.unzip(sensorsAndBeacons)
  const sensors = toPos(sensorsPt)
  const beacons = toPos(beaconsPt)
  const map = sensorsAndBeacons
    .flatMap(([sensor, beacon]) => computeNoBeacon(sensor, beacon))
  const noBeacon = new Set(map
    .map(([x, y]) => `${x},${y}`)
    .filter(id => !sensors.has(id) && !beacons.has(id)),
  )
  if (displayMap) {
    display(beacons, sensors, noBeacon, s)
  }
  return noBeacon
}

// 8.853s
export const impactOnRowSlow = (row: number) => (sensor: Point, beacon: Point): string[] => {
  const [x, y] = sensor
  const dist = distance(sensor, beacon)
  const w = dist - abs(y - row)
  return w < 1
    ? []
    : range(x - w, x + w)
      .filter(i => !(beacon[1] == row && i == beacon[0]))
      .map(i => `${i},${row}`)
}

// 1ms
export const impactOnRowOptimized = (row: number) => (sensor: Point, beacon: Point) => {
  const [x, y] = sensor
  const dist = distance(sensor, beacon)
  const w = dist - abs(y - row)
  return w < 1 ? null : [x - w, x + w] as [number, number]
}

export const mergeInterval = (intervals: Array<[number, number] | null>) => {
  const valid = (intervals.filter(Boolean) as Array<[number, number]>)
    .sort((a, b) => a[0] - b[0])

  let index = 0
  for (let i = 1; i < valid.length; i++) {
    // @ts-ignore
    if (valid[index][1] >= valid[i][0]) {
      // @ts-ignore
      valid[index][1] = max(valid[index][1], valid[i][1])
    } else {
      index++
      // @ts-ignore
      valid[index] = valid[i]
    }
  }
  return valid.slice(0, index + 1)
}

export const noBeaconOnRowOptimized = (row: number) => (input: string[]) => {
  const sensorsAndBeacons = getSensorsAndBeacons(input)
  const noBeaconInterval = sensorsAndBeacons
    .map(([sensor, beacon]) => impactOnRowOptimized(row)(sensor, beacon))

  const merged = mergeInterval(noBeaconInterval)
  const count = merged.map(([start, end]) => end - start + 1)
    .reduce((a, b) => a + b)

  // Remove 1 for the Beacon on row
  return count - 1
}

export const findDistressBeacon = (input: string[], height = 4_000_000): Point => {
  const sensorsAndBeacons = getSensorsAndBeacons(input)

  let x = 0
  let y = 0
  for (let row = 0; row <= height; row++) {
    const noBeaconInterval =
      sensorsAndBeacons.map(([sensor, beacon]) => impactOnRowOptimized(row)(sensor, beacon))
    const merged = mergeInterval(noBeaconInterval)
    if (merged.length >= 2) {
      x = (merged?.[0]?.[1] ?? 0)+1
      y = row
      break
    }
  }
  return [x ,y]
}

export const tuningFreq = ([x,y]: Point) : number =>
  x * 4_000_000 + y