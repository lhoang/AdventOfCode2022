import { readFileAsLines, split } from '../../utils/input.js'
import { expect } from 'vitest'
import {
  computeNoBeaconZoneNaiveWay,
  computeNoBeacon,
  display,
  distance,
  getSensorsAndBeacons,
  parseSensorAndBeacon,
  size,
  toPos, impactOnRowSlow, noBeaconOnRowOptimized, mergeInterval, findDistressBeacon, impactOnRowOptimized, tuningFreq,
} from './Beacon.js'
import { A } from '@mobily/ts-belt'
const realInput = readFileAsLines('2022/day15/input.txt')

const input = split`
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`

describe('Beacon', () => {
  it('should parse Sensor and Beacon', () => {
    expect(parseSensorAndBeacon(input[0]??'')).toEqual([[2, 18], [-2, 15]])
    expect(parseSensorAndBeacon(input[1]??'')).toEqual([[9, 16], [10, 16]])
  })

  it('should compute the Manhattan distance', () => {
    expect(distance([8, 7], [2, 10])).toEqual(9)
  })

  it('should compute size of map', () => {
    const points = input.flatMap(parseSensorAndBeacon)
    expect(size(points)).toEqual({
      minX:-2, maxX: 25, minY: 0, maxY: 22
    })
  })

  it('should compute no beacon points', () => {
    const res = computeNoBeacon([8,0], [9,-1])
    expect(res).toHaveLength(13)
  })

  it('should display map', () => {
    const sensorsAndBeacons = getSensorsAndBeacons(input)
    const s = size(sensorsAndBeacons.flatMap(([a,b]) => [a,b]))
    const [sensorsPt, beaconsPt] = A.unzip(sensorsAndBeacons)
    const sensors = toPos(sensorsPt)
    const beacons = toPos(beaconsPt)
    const noB = toPos(computeNoBeacon([8,7], [2,10]))
    display(beacons, sensors, noB, s)
  })

  it('should compute the no beacon zone - Naive way', () => {
    const res = computeNoBeaconZoneNaiveWay(input, true)
    const line10 = [...res.keys()].filter(id => id.endsWith(',10')).length
    expect(line10).toEqual(26)
  })

  it('should compute impact of Sensor on Row', () => {
    const res = impactOnRowSlow(10)([8,7], [2,10])
    expect(res).toHaveLength(12)

    const res2 =  impactOnRowOptimized(0)([8,7], [2,10])
    expect(res2).toEqual([ 6, 10 ])
  })

  it('should compute the nobeacon row', () => {
    const res = noBeaconOnRowOptimized(10)(input)
    expect(res).toEqual(26)
  })

  it('should compute the nobeacon row - part 1 ⭐️', () => {
    const res = noBeaconOnRowOptimized(2000000)(realInput)
    expect(res).toEqual(4861076)
  })

  it('should merge intervals', () => {
    const intervals: Array<[number, number] | null> = [
        null,
        [2, 14],
        [-2, 2],
        [16, 24],
        [14, 18],
    ]
    expect(mergeInterval(intervals)).toEqual([[-2,24]])

    const intervals2: Array<[number, number] | null> = [
      null,
      [3, 14],
      [-2, 2],
      [16, 24],
      [14, 18],
    ]
    expect(mergeInterval(intervals2)).toEqual([[-2,2], [3, 24]])
  })

  it('should find distressed', () => {
    const res = findDistressBeacon(input, 20)
    expect(res).toEqual([14, 11])
    expect(tuningFreq(res)).toEqual(56000011)

  })
  it('should find distressed - part 2 ⭐️⭐️', () => {
    const res = findDistressBeacon(realInput)
    expect(res).toEqual([2662275, 3160102])
    expect(tuningFreq(res)).toEqual(10_649_103_160_102)
  })
})