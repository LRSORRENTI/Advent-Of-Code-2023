import * as fs from 'fs';

const MOVES: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// Custom interface for the grid
interface Grid extends Array<Array<string>> {}

// Function getNeighbs with grid parameter typed according to the custom interface
function getNeighbs(grid: Grid): {[key: string]: string[]} {
  let rowLen = grid.length;
  let colLen = grid[0].length;
  let graph: {[key: string]: string[]} = {};
  for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
    for (let colIdx = 0; colIdx < colLen; colIdx++) {
      let neigh = MOVES.map((m) => [(m[0] + rowIdx) % rowLen, (m[1] + colIdx) % colLen])
        .filter((l) => l[0] > -1 && l[0] < rowLen && l[1] > -1 && l[1] < colLen)
        .filter((l) => grid[l[0]][l[1]] == '.' || grid[l[0]][l[1]] == 'S')
        .map((l) => l[0] + "," + l[1]);
      graph[rowIdx + "," + colIdx] = neigh;
    }
  }
  return graph;
}

// Custom type for the graph
type Graph = { [key: string]: string[] };

// Custom type for the grid
type GridTwo = string[][];

function getDestCount(graph: Graph, start: string, steps: number): number {
  let locSet = new Set<string>();
  locSet.add(start);
  for (let idx = 0; idx < steps; idx++) {
    let tempSet = new Set<string>();
    // for (let crr of locSet.values()) {
        for (let crr of Array.from(locSet.values())) {
      graph[crr].forEach((x) => tempSet.add(x));
    }
    locSet = new Set(tempSet);
  }
  return locSet.size;
}

function getDestCount2(start: string, steps: number, maxRow: number, grid: GridTwo): number {
  let locSet = new Set<string>();
  let points: number[] = [];
  locSet.add(start);
  for (let idx = 0; idx < steps; idx++) {
    let tempSet = new Set<string>();
    for (let crr of locSet.values()) {
      for (let m of MOVES) {
        let np = crr.split(',').map((c, i) => parseInt(c) + m[i]);
        if (grid[(np[0] + maxRow * 3) % maxRow][(np[1] + maxRow * 3) % maxRow] != '#') {
          tempSet.add(np[0] + "," + np[1]);
        }
      }
    }
    locSet = new Set(tempSet);
    if ((idx + 1) % maxRow == steps % maxRow) {
      points.push(locSet.size);
    }
    if (points.length == 3) {
      break;
    }
  }
  let a = (points[2] + points[0] - 2 * points[1]) / 2;
  let b = points[1] - points[0] - a;
  let c = points[0];
  let n = Math.floor(steps / maxRow);
  return a * n ** 2 + b * n + c;
}

type GridArr = string[][];

function partOne(grid: GridArr, numSteps: number): number {
  let rowLen = grid.length;
  let colLen = grid[0].length;
  let start: string | null = null;
  
  for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
    for (let colIdx = 0; colIdx < colLen; colIdx++) {
      if (grid[rowIdx][colIdx] === 'S') start = rowIdx + "," + colIdx;
    }
  }

  if (start === null) {
    throw new Error("Start position not found in the grid");
  }
  
  let graph = getNeighbs(grid);
  return getDestCount(graph, start, numSteps);
}

function partTwo(grid: Grid, numSteps: number): number {
  let rowLen = grid.length;
  let colLen = grid[0].length;
  let start: string | null = null;
  
  for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
    for (let colIdx = 0; colIdx < colLen; colIdx++) {
      if (grid[rowIdx][colIdx] === 'S') start = rowIdx + "," + colIdx;
    }
  }

  if (start === null) {
    throw new Error("Start position not found in the grid");
  }
  
  return getDestCount2(start, numSteps, rowLen, grid);
}

const input: GridArr = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(row => row.split(''));

console.log('Part 1       :', partOne(input, 64));
console.log('Part 2       :', partTwo(input, 26501365));