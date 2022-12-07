import { readFileAsLines, split } from '../../utils/input.js'
import {
  buildTree,
  display,
  findAndSumSmallDirectoriesSizes,
  findDirToDelete,
} from './NoSpaceLeft.js'
import { expect } from 'vitest'
const realInput = readFileAsLines('2022/day07/input.txt')

const input = split`
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

describe('NoSpaceLeft', () => {
  it('should build the tree', () => {
    const root = buildTree(input)
    expect(root.size).toEqual(48381165)
    expect(root.children.length).toEqual(4)
  })

  it('should find small dirs', () => {
    const root = buildTree(input)
    const res = findAndSumSmallDirectoriesSizes(root)
    expect(res).toEqual(95437)
  })

  it('should display tree', () => {
    const root = buildTree(input)
    display(root)
  })

  it('should find small dirs - part 1 ⭐️', () => {
    const root = buildTree(realInput)
    // display(root)
    const res = findAndSumSmallDirectoriesSizes(root)
    expect(res).toEqual(1348005)
  })

  it('should find the dir to delete', () => {
    const root = buildTree(input)
    expect(findDirToDelete(root)).toEqual(24933642)
  })

  it('should find the dir to delete - part 2 ⭐️', () => {
    const root = buildTree(realInput)
    expect(findDirToDelete(root)).toEqual(12785886)
  })
})
