import * as fs from 'fs';
// Defining a type 'CubeColor' which can be 'red', 'green', or 'blue'
type CubeColor = 'red' | 'green' | 'blue';

// Defining an interface 'GameResult' that contains an ID and an object with keys of CubeColor type and number values
interface GameResult {
  id: number;
  maxCubes: { [color in CubeColor]: number };
}

// Reading the file specified in the second command line argument and converting it to a string
const data = fs.readFileSync(process.argv[2], 'utf8');
// Splitting the file content into lines
const lines = data.split("\n");

// Initializing a variable 'i' to track the game ID
let i = 1;
// Initializing an array 'results' to store the game results
const results: GameResult[] = [];

// Iterating over each line in the file
for (const line of lines) {
  // Splitting each line into parts using ": " as delimiter
  const p = line.split(": ");
  // Parsing the game ID from the first part and converting it to an integer
  i = parseInt(p[0].substring("Game ".length), 10);
  // Splitting the second part into rounds using "; " as delimiter
  const rounds = p[1].split("; ");
  // Initializing an object to keep track of the maximum number of cubes of each color
  const maxCubes: { [color in CubeColor]: number } = { red: 0, green: 0, blue: 0 };

  // Iterating over each round
  for (const round of rounds) {
    // Splitting each round into parts using ", " as delimiter
    const parts = round.split(", ");
    for (const part of parts) {
      // Splitting each part into count and color
      const [countStr, color] = part.split(" ");
      // Parsing the count as an integer
      const count = parseInt(countStr, 10);
      // Updating the maxCubes object if the current count is greater than the existing count for that color
      if (color in maxCubes) {
        maxCubes[color as CubeColor] = Math.max(maxCubes[color as CubeColor], count);
      }
    }
  }

  // Adding the game result to the results array
  results.push({ id: i, maxCubes });
}

// Calculating the minimum game value by multiplying the maximum number of each color cube for each game and summing them up
const minGame = results.reduce((acc, curr) => acc + curr.maxCubes.red * curr.maxCubes.green * curr.maxCubes.blue, 0);
// Logging the minimum game value to the console
console.log(minGame);