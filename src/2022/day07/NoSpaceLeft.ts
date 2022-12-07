import { color, colors } from '../../utils/display.js'

type Type = 'file' | 'dir'

export class Node {
  name: string
  _size: number
  type: Type
  parent: Node | null
  children: Node[] = []

  constructor(name: string, type: Type, parent: Node | null, size: number) {
    this.name = name
    this.parent = parent
    this._size = size
    this.type = type
  }

  addChild(child: Node) {
    this.children.push(child)
  }

  get size(): number {
    return this.type == 'file'
      ? this._size
      : this.children.map(c => c.size).reduce((a, b) => a + b)
  }
}

export const buildTree = (input: string[]): Node => {
  const root = new Node('/', 'dir', null, 0)

  const move = (s: string, current: Node): Node => {
    const [_dollar, _cd, path = '/'] = s.split(' ')
    let target: Node
    if (path == '/') {
      target = root
    } else if (path == '..') {
      target = current.parent ?? root
    } else {
      const found = current.children.find(c => c.name == path)
      if (!found) throw new Error(`no child ${path} found `)
      target = found
    }
    return target
  }

  const createNode = (s: string, parent: Node): Node => {
    if (s.startsWith('dir')) {
      const [_dir, name = ''] = s.split(' ')
      return new Node(name, 'dir', parent, 0)
    } else {
      const [size = 0, name = ''] = s.split(' ')
      return new Node(name, 'file', parent, +size)
    }
  }

  const parse = (s: string, currentNode: Node): Node => {
    let newCurrent = currentNode
    if (s.startsWith('$ cd')) {
      newCurrent = move(s, currentNode)
    } else if (s.startsWith('$ ls')) {
      // do nothing
    } else {
      // list
      const newNode = createNode(s, currentNode)
      currentNode.addChild(newNode)
    }
    return newCurrent
  }

  input.reduce((currentNode, line) => parse(line, currentNode), root)

  return root
}

export const findAndSumSmallDirectoriesSizes = (root: Node) => {
  const findRec = (node: Node): Node[] =>
    node.type == 'dir' && node.size <= 100000
      ? [node, ...node.children.flatMap(findRec)]
      : node.children.flatMap(findRec)

  const foundDir = findRec(root)
  return foundDir.map(d => d.size).reduce((a, b) => a + b)
}

export const display = (current: Node): void => {
  const displayRec = (node: Node, depth: number) => {
    const text =
      (depth == 0 ? '' : '  '.repeat(depth) + '|__') +
      color(
        `${node.name} (${node.type}, ${node.size})`,
        node.type == 'dir'
          ? node.size <= 100000
            ? colors.fg.red
            : colors.fg.yellow
          : colors.fg.green,
      )
    console.log(text)
    node.children.map(c => displayRec(c, depth + 1))
  }
  displayRec(current, 0)
}

export const findDirToDelete = (root: Node) => {
  const neededSize = 30_000_000 - (70_000_000 - root.size)

  const findRec = (node: Node): Node[] =>
    node.type == 'dir' && node.size >= neededSize
      ? [node, ...node.children.flatMap(findRec)]
      : node.children.flatMap(findRec)

  const foundDir = findRec(root)
    .map(n => n.size)
    .sort((a, b) => a - b)?.[0]

  return foundDir ?? 0
}
