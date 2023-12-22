import * as fs from 'fs';

const MOVES: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// Custom interface for the grid
interface Grid extends Array<Array<string>> {}

// Function to get the neighbors of each cell in a grid.
// It takes a grid (as a two-dimensional array of strings) and returns a graph object.
function getNeighbs(grid: GridTwo): {[key: string]: string[]} {
    // Determine the number of rows and columns in the grid.
    let rowLen = grid.length;
    let colLen = grid[0].length;
  
    // Initialize an object to store the neighbors of each cell.
    let graph: {[key: string]: string[]} = {};
  
    // Iterate through each cell in the grid.
    for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
      for (let colIdx = 0; colIdx < colLen; colIdx++) {
        // Calculate neighbors for the current cell.
        let neigh = MOVES.map((m) => [(m[0] + rowIdx) % rowLen, (m[1] + colIdx) % colLen])
          // Filter out neighbors that are outside the grid.
          .filter((l) => l[0] > -1 && l[0] < rowLen && l[1] > -1 && l[1] < colLen)
          // Further filter neighbors based on specific conditions (e.g., cells marked with '.' or 'S').
          .filter((l) => grid[l[0]][l[1]] == '.' || grid[l[0]][l[1]] == 'S')
          // Convert the coordinates of the neighbors into string format.
          .map((l) => l[0] + "," + l[1]);
  
        // Assign the calculated neighbors to the current cell in the graph object.
        graph[rowIdx + "," + colIdx] = neigh;
      }
    }
  
    // Return the graph object containing neighbors for each cell.
    return graph;
  }
  
  // Custom type for the graph, mapping from string keys to arrays of strings.
  type Graph = { [key: string]: string[] };
  
  // Custom type for the grid, represented as a two-dimensional array of strings.
  type GridTwo = string[][];
  

// Function to get the count of distinct destinations reachable from the start point in a given number of steps.
// It takes a graph, a start point, and the number of steps.
function getDestCount(graph: Graph, start: string, steps: number): number {
    // Initialize a set to keep track of the current locations.
    let locSet = new Set<string>();
    locSet.add(start);  // Add the start point to the set.
  
    // Iterate for the given number of steps.
    for (let idx = 0; idx < steps; idx++) {
      // Create a temporary set to store new locations for this step.
      let tempSet = new Set<string>();
  
      // Iterate over the current locations.
      for (let crr of Array.from(locSet.values())) {
        // For each current location, add all its neighbors to the temporary set.
        graph[crr].forEach((x) => tempSet.add(x));
      }
  
      // Update the current locations set to the new locations found in this step.
      locSet = new Set(tempSet);
    }
  
    // Return the count of unique locations reached.
    return locSet.size;
  }
  

// Function to calculate the number of distinct destinations from a starting point over a given number of steps.
// It takes the starting point, number of steps, maximum row size, and the grid as parameters.
function getDestCount2(start: string, steps: number, maxRow: number, grid: GridTwo): number {
    // Initialize a set to keep track of current locations.
    let locSet = new Set<string>();
    let points: number[] = [];  // Array to store the size of locSet at specific intervals.
    locSet.add(start);  // Add the starting point to the set.
  
    // Iterate for the given number of steps.
    for (let idx = 0; idx < steps; idx++) {
      // Create a temporary set to store new locations for this step.
      let tempSet = new Set<string>();
  
      // Iterate over the current locations.
      for (let crr of locSet.values()) {
        // For each location, calculate and add new possible locations based on MOVES.
        for (let m of MOVES) {
          let np = crr.split(',').map((c, i) => parseInt(c) + m[i]);
          // Check if the new position is valid (not blocked by '#') and add it to tempSet.
          if (grid[(np[0] + maxRow * 3) % maxRow][(np[1] + maxRow * 3) % maxRow] != '#') {
            tempSet.add(np[0] + "," + np[1]);
          }
        }
      }
  
      // Update the set of current locations to the new locations found in this step.
      locSet = new Set(tempSet);
  
      // If the current step matches a specific pattern, record the size of locSet.
      if ((idx + 1) % maxRow == steps % maxRow) {
        points.push(locSet.size);
      }
  
      // If three points have been recorded, stop the loop.
      if (points.length == 3) {
        break;
      }
    }
  
    // Calculate the return value based on the recorded points.
    let a = (points[2] + points[0] - 2 * points[1]) / 2;
    let b = points[1] - points[0] - a;
    let c = points[0];
    let n = Math.floor(steps / maxRow);
    return a * n ** 2 + b * n + c;
  }
  
type GridArr = string[][];

// Function to calculate the first part of the solution.
// It takes a grid (as a two-dimensional array of strings) and the number of steps.
function partOne(grid: GridArr, numSteps: number): number {
    // Determine the number of rows and columns in the grid.
    let rowLen = grid.length;
    let colLen = grid[0].length;
  
    // Initialize a variable to store the start position.
    let start: string | null = null;
    
    // Iterate through each cell in the grid to find the start position.
    for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
      for (let colIdx = 0; colIdx < colLen; colIdx++) {
        // If the current cell is marked as 'S', set it as the start position.
        if (grid[rowIdx][colIdx] === 'S') start = rowIdx + "," + colIdx;
      }
    }
  
    // If the start position is not found, throw an error.
    if (start === null) {
      throw new Error("Start position not found in the grid");
    }
    
    // Generate a graph from the grid where each cell is a node and edges are based on MOVES.
    let graph = getNeighbs(grid);
  
    // Calculate and return the number of distinct destinations reachable from the start in the given number of steps.
    return getDestCount(graph, start, numSteps);
  }
// Function to calculate the second part of the solution.
// It takes a grid (as a two-dimensional array of strings) and the number of steps.
function partTwo(grid: GridArr, numSteps: number): number {
    // Determine the number of rows and columns in the grid.
    let rowLen = grid.length;
    let colLen = grid[0].length;
  
    // Initialize a variable to store the start position.
    let start: string | null = null;
    
    // Iterate through each cell in the grid to find the start position.
    for (let rowIdx = 0; rowIdx < rowLen; rowIdx++) {
      for (let colIdx = 0; colIdx < colLen; colIdx++) {
        // If the current cell is marked as 'S', set it as the start position.
        if (grid[rowIdx][colIdx] === 'S') start = rowIdx + "," + colIdx;
      }
    }
  
    // If the start position is not found, throw an error.
    if (start === null) {
      throw new Error("Start position not found in the grid");
    }
    
    // Calculate and return the number of distinct destinations reachable from the start in the given number of steps using the second approach.
    return getDestCount2(start, numSteps, rowLen, grid);
  }
  
  // Read and process the input file.
  const input: GridArr = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(row => row.split(''));
  
  // Calculate and display the results for part one and part two of the problem.
  console.log('Part 1       :', partOne(input, 64));
  console.log('Part 2       :', partTwo(input, 26501365));
  