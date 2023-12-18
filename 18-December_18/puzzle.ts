import fs from 'fs';

// Custom type for mode
type ParseMode = 'normal' | 'color';

// Custom interface for parsed data
interface ParsedData {
  direction: string;
  steps: number;
  color?: string; // Optional, used only in 'color' mode
}

const readInputFile = (filePath: string): string => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error('Error reading file:', err);
      return '';
    }
};

const data = (input: string, mode: ParseMode): ParsedData[] =>
  input
    .trim()
    .split('\n')
    .map((layer) => {
      const [direction, steps, color] = layer.match(regex)!.slice(1)
      switch (mode) {
        case 'normal':
          return { direction, steps: Number(steps) }
        case 'color':
          return {
            direction: ['R', 'D', 'L', 'U'][Number(color[5])],
            steps: parseInt(color.slice(0, 5), 16),
          }
      }
    })

const regex = /(\w) (\d+) \(#([\w\d]+)\)/


const totalCubicMeters = (insertion: ParsedData[]) => {
    // Initialize arrays to track the x and y steps.
    const xSteps: number[] = [0]
    const ySteps: number[] = [0]
  
    // Loop through each element in the insertion array (except the last one).
    for (let i = 0; i < insertion.length - 1; ++i) {
      // Destructure to get direction and steps from the current element.
      const { direction, steps } = insertion[i]
  
      // Calculate the new x position based on the direction and add it to the xSteps array.
      xSteps.push(
        xSteps[xSteps.length - 1] + (direction === 'R' ? steps : direction === 'L' ? -steps : 0),
      )
  
      // Similarly, calculate the new y position and add it to the ySteps array.
      ySteps.push(
        ySteps[ySteps.length - 1] + (direction === 'U' ? steps : direction === 'D' ? -steps : 0),
      )
    }
  
    // Initialize a variable to track missed cells.
    let missedCells = 0
  
    // Loop through each step to calculate missed cells.
    for (let i = 0; i < xSteps.length; ++i) {
      // Define points alpha, bravo, and charlie for comparison.
      const alpha = [xSteps[i], ySteps[i]]
      const bravo = [xSteps[(i + 1) % xSteps.length], ySteps[(i + 1) % xSteps.length]]
      const charlie = [xSteps[(i + 2) % xSteps.length], ySteps[(i + 2) % xSteps.length]]
  
      // Calculate the x and y directions between alpha and bravo.
      const xDirections = bravo[0] - alpha[0]
      const yDirections = bravo[1] - alpha[1]
  
      // Check conditions for missed cells and adjust the count.
      if (xDirections < 0 && yDirections === 0) {
        missedCells += -xDirections + 1
        if (charlie[1] < bravo[1]) missedCells--
      } else if (yDirections > 0) {
        missedCells += yDirections
        if (charlie[0] < bravo[0]) missedCells--
      }
    }
  
    // Calculate the total number of steps.
    const numSteps = xSteps.length
  
    // Calculate the enclosed area using a formula for polygons.
    const entArea: number =
      0.5 *
      Math.abs(
        xSteps.reduce(
          (accumulator, value, i) =>
            accumulator + (value * ySteps[(i + 1) % numSteps] - xSteps[(i + 1) % numSteps] * ySteps[i]),
          0,
        ) +
          (xSteps[numSteps - 1] * ySteps[0] - xSteps[0] * ySteps[numSteps - 1]),
      )
  
    // Log and return the total area including missed cells.
    console.log(entArea + missedCells)
    return entArea + missedCells
  }
  

const input = readInputFile('./input.txt');

const puzzleOne = (input: string) => totalCubicMeters(data(input, 'normal'))
const puzzleTwo = (input: string) => totalCubicMeters(data(input, 'color'))

console.log("Part 1 Result:", puzzleOne(input));
console.log("Part 2 Result:", puzzleTwo(input));