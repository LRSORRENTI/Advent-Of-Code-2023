import * as fs from 'fs'

// Defines a type ReflectLineInfo with two 
// properties: count (number of lines) 
// and refLines (type of reflection line).

type ReflectLineInfo = {
  count: number
  refLines: ReflectionLines
}

// Defines an enumeration ReflectionLines with
//three possible values representing vertical, 
// horizontal, and unknown reflection lines.

enum ReflectionLines {
    Vert = 'V',
    Horizontal = 'H',
    Unknown = '?',
  }

//   This function below calculates the number of 
//   reflection lines in a given grid. It takes 
//   the grid, the type of reflection line to look 
//   for (refLines), and an optional initialLofInfo which 
//   is used to compare against the current reflection 
//   count.

const reflectCount = (
  grid: string[][],
  refLines: ReflectionLines,
  initialLofInfo: ReflectLineInfo | undefined = undefined
): number => {
  const rowsCounted = grid.length
  const colssCounted = grid[0].length
  const reflVert = refLines === ReflectionLines.Vert

  let initOne = 0
  let initTwo = 1
  while (initTwo < (reflVert ? colssCounted : rowsCounted)) {
    let currentOne = initOne
    let currentTwo = initTwo
    let matched = true
    while (
      matched &&
      0 <= currentOne &&
      currentTwo < (reflVert ? colssCounted : rowsCounted)
    ) {
      for (let i = 0; i < (reflVert ? rowsCounted : colssCounted); i++) {
        reflVert ? rowsCounted : colssCounted
        if (
          reflVert
            ? grid[i][currentOne] !== grid[i][currentTwo]
            : grid[currentOne][i] !== grid[currentTwo][i]
        ) {
          matched = false
          break
        }
      }
      currentOne--
      currentTwo++
    }
    const total = initOne + 1
    if (
      (initialLofInfo?.refLines !== refLines ||
        initialLofInfo?.count !== (reflVert ? total : 100 * total)) &&
      matched
    ) {
      const total = initOne + 1
      return reflVert ? total : 100 * total
    }
    initOne++
    initTwo++
  }
  return 0
}

// This function below iterates over the grid, 
// flipping each cell from # to . or vice versa, 
// to find a new reflection line that is different 
// from the initial one. It returns the count of 
// the new reflection line.

const getDifferentReflectionCount = (
  initialLofInfo: ReflectLineInfo,
  grid: string[][]
): number => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j] === '#' ? '.' : '#'
      let count = reflectCount(
        grid,
        ReflectionLines.Vert,
        initialLofInfo
      )
      if (count === 0) {
        count = reflectCount(
          grid,
          ReflectionLines.Horizontal,
          initialLofInfo
        )
      }
      grid[i][j] = grid[i][j] === '#' ? '.' : '#'
      if (count !== 0) {
        return count
      }
    }
  }
  return 0
}

// This function below reads the puzzle input from a file 
// and processes each pattern in the file. It finds 
// the initial reflection line, then uses 
// getDifferentReflectionCount to find the new 
// line of reflection after fixing the smudge.

const solve = (file: string) => {
  const patterns = fs.readFileSync(file, 'utf-8').split('\r\n\r\n')

  let total = 0
  for (const pattern of patterns) {
    let initialLofInfo: ReflectLineInfo = {
      count: 0,
      refLines: ReflectionLines.Unknown,
    }
    const grid = pattern.split(/[\n\r]+/).map((line) => line.split(''))
    let count = reflectCount(grid, ReflectionLines.Vert)
    if (count === 0) {
      count = reflectCount(grid, ReflectionLines.Horizontal)
      initialLofInfo.count = count
      initialLofInfo.refLines = ReflectionLines.Horizontal
    } else {
      initialLofInfo.count = count
      initialLofInfo.refLines = ReflectionLines.Vert
    }
    total += getDifferentReflectionCount(initialLofInfo, grid)
  }
  return total
}

// Logs the output
console.log(solve('input.txt'))

// The reflectCount and getDifferentReflectionCount 
// functions are the core of this solution, where 
// reflectCount finds the reflection lines in the 
// grid, and getDifferentReflectionCount alters the 
// grid to find a different valid reflection line. 

// The solve function orchestrates reading the 
// patterns and calculating the total based 
// on these functions.