import * as fs from 'fs'

enum Direction {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}
enum Element {
  RoundRock = 'O',
  CubeRock = '#',
  Empty = '.',
}

const gridAng = (direction: Direction, grid: string[][]): number => {
  let load = 0
  if (direction === Direction.N) {
    for (let col = 0; col < grid[0].length; col++) {
      let emptyRow = -1
      for (let row = 0; row < grid.length; row++) {
        const currentEle = grid[row][col]
        if (currentEle === Element.Empty && emptyRow === -1) {
          emptyRow = row
        } else if (currentEle === Element.RoundRock) {
          if (emptyRow !== -1) {
            grid[emptyRow][col] = Element.RoundRock
            grid[row][col] = Element.Empty
            load += grid.length - emptyRow
            emptyRow = emptyRow + 1
          } else {
            load += grid.length - row
          }
        } else if (currentEle === Element.CubeRock) {
          emptyRow = -1
        }
      }
    }
  }
  return load
}

const runGrid = (grid: string[][]) => {
  let stringData = ''
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      stringData += grid[i][j]
    }
    stringData += '\n'
  }
  console.log(stringData)
}

const solve = (file: string) => {
  const grid = fs
    .readFileSync(file, 'utf-8')
    .split(/[\n\r]+/)
    .map((line) => line.split(''))

  const load = gridAng(Direction.N, grid)
  runGrid(grid)
  return load
}

console.log(solve('input.txt'))