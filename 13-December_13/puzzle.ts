// Importing the file system module from Node.js to read files.
// import * as fs from "fs";

// Define a type 'Pattern', which is an array of strings. This represents a group of text lines.
type Pattern = string[];

// Define an interface 'PatternProcessor'. It represents a function that takes a Pattern and returns a number.
interface PatternProcessor {
  (pattern: Pattern): number;
}

// Read the content of 'input.txt' as a string, split it into lines, and store them in 'inputLines'.
// This uses regular expression to split lines on both UNIX and Windows line endings.
const inputLines: string[] = fs
  .readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .map((inputLine: string) => inputLine);

// Function 'readPatterns' takes an array of strings and returns an array of Patterns.
// It groups the input lines into patterns separated by empty lines.
const readPatterns = (inputLines: string[]): Pattern[] => {
  let patterns: Pattern[] = [];  // Array to hold groups of patterns.
  let currentPattern: Pattern = [];  // Temporary array to hold the current group of lines.

  // Iterate through each line in 'inputLines'.
  inputLines.forEach((inputLine: string) => {
    if (inputLine === "") {
      // If the line is empty, it's a separator. Push the current group to 'patterns' and reset it.
      patterns.push(currentPattern);
      currentPattern = [];
    } else {
      // Otherwise, add the line to the current pattern.
      currentPattern.push(inputLine);
    }
  });

  // Push the last pattern if it's not empty (to handle cases without a trailing newline).
  patterns.push(currentPattern);
  return patterns;
};

// Function 'mirroredStr' checks if a string is symmetrical (a palindrome).
// It returns true if the string is the same forwards and backwards.
const mirroredStr = (string: string): boolean => {
  // Loop through the first half of the string.
  for (let i = 0; i < string.length / 2; i++) {
    // Compare each character to its counterpart from the end. If any don't match, it's not a mirror.
    if (string[i] !== string[string.length - i - 1]) {
      return false;
    }
  }
  // If all characters matched, the string is a mirror.
  return true;
};
// Function 'withVertMirror' checks for a vertical mirror in a pattern.
// It returns the index of the mirror line, or -1 if there's no vertical mirror.
const withVertMirror: PatternProcessor = (currentPattern: Pattern): number => {
    // Start from the second character in the first row.
    let x = 1;
  
    // Iterate through each character in the first row.
    while (x < currentPattern[0].length) {
      // Check for consecutive identical characters. They can indicate a potential mirror line.
      if (currentPattern[0][x] === currentPattern[0][x - 1]) {
        // Calculate distances to the left and right ends from the current position.
        const rightDist = currentPattern[0].length - x;
        const leftDist = x;
        // The effective distance is the minimum of left and right distances.
        const fullDist = Math.min(rightDist, leftDist);
  
        // Check each row to see if the pattern is mirrored at this position.
        let y = 0;
        let hasMirror = true;
        while (y < currentPattern.length) {
          // Extract a substring around the potential mirror line.
          const subString = currentPattern[y].substring(x - fullDist, x + fullDist);
  
          // If the substring is not mirrored, this is not a mirror line.
          if (!mirroredStr(subString)) {
            hasMirror = false;
            break;
          }
          y++;
        }
        // If a mirror is found, return the index.
        if (hasMirror) {
          return x;
        }
      }
      x++;
    }
    // Return -1 if no mirror line is found.
    return -1;
  };
  
  // Function 'withHorizMirror' checks for a horizontal mirror in a pattern.
  // It returns the index of the mirror line, or -1 if there's no horizontal mirror.
  const withHorizMirror: PatternProcessor = (currentPattern: Pattern): number => {
    // Start from the second row.
    let y = 1;
  
    // Iterate through each row.
    while (y < currentPattern.length) {
      // Check if the first characters of this and the previous row are the same.
      if (currentPattern[y][0] === currentPattern[y - 1][0]) {
        // Calculate distances to the top and bottom from the current row.
        const yAxisDistUp = y;
        const yAxisDistDown = currentPattern.length - y;
        const fullDist = Math.min(yAxisDistUp, yAxisDistDown);
  
        // Check each column to see if the pattern is mirrored at this row.
        let x = 0;
        let hasMirror = true;
  
        while (x < currentPattern[0].length) {
          // Create a string of characters from each row at the current column.
          const column = currentPattern.map((row) => row[x]).join("");
          // Extract a substring around the potential mirror line.
          const subString = column.substring(y - fullDist, y + fullDist);
  
          // If the substring is very short, continue to the next column.
          if (subString.length < 2) {
            x++;
            continue;
          }
  
          // If the substring is not mirrored, this is not a mirror line.
          if (!mirroredStr(subString)) {
            hasMirror = false;
            break;
          }
          x++;
        }
        // If a mirror is found, return the index.
        if (hasMirror) {
          return y;
        }
      }
      y++;
    }
    // Return -1 if no mirror line is found.
    return -1;
  };
  
  // The 'part1' function processes the patterns to find mirrors.
  const part1 = (): void => {
    // Read and group the input lines into patterns.
    const patterns = readPatterns(inputLines);
  
    // Calculate the sum of vertical mirror indices.
    const verticalMirrorsSum = patterns
      .map(withVertMirror)
      .filter((x: number) => x !== -1)
      .reduce((acc: number, now: number) => acc + now, 0);
  
    // Calculate the sum of horizontal mirror indices, each multiplied by 100.
    const horizontalMirrorsSum = patterns
      .map(withHorizMirror)
      .filter((x: number) => x !== -1)
      .reduce((acc: number, now: number) => acc + now * 100, 0);
    
    // Output the total sum of all mirror indices.
    console.log(verticalMirrorsSum + horizontalMirrorsSum);
  };
  

  part1();
  
  export { withVertMirror, withHorizMirror };
  