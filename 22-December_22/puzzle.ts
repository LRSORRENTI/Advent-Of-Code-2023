import * as fs from 'fs';

// Define a Dictionary interface where each key is a string and its value is a number.
interface Dictionary {
    [key: string]: number;
  }
  
  // Function to get a value from the dictionary or return a default value.
  // It takes a dictionary, a key, and an optional default value (defaulting to 0).
  function ddGet(dict: Dictionary, key: string, deflt: number = 0): number {
    if (key in dict) return dict[key];  // If the key exists in the dictionary, return its value.
    return deflt;  // If the key does not exist, return the default value.
  }
  
  // Function to calculate the fall of a brick.
  // It takes a dictionary representing the tallest point on each coordinate, and a brick as an array of numbers.
  function doFall(tallest: Dictionary, brick: number[]): number[] {
    let peak = -1;  // Initialize the highest point encountered as -1.
    // Loop through the x and y coordinates covered by the brick.
    for (let x = brick[0]; x <= brick[3]; x++) {
      for (let y = brick[1]; y <= brick[4]; y++) {
        let crrPeak = ddGet(tallest, [x, y].toString());  // Get the peak height at the current coordinate.
        peak = peak < crrPeak ? crrPeak : peak;  // Update the peak to the highest value encountered.
      }
    }
    // Calculate the fall distance, ensuring it's not negative.
    let fall = Math.max(brick[2] - peak - 1, 0);  
    // Return the new position of the brick after falling, adjusting its height and depth accordingly.
    return [brick[0], brick[1], brick[2] - fall, brick[3], brick[4], brick[5] - fall];
  }
  
// Function to simulate dropping bricks in a tower and calculate the outcome.
// It takes a two-dimensional array of numbers representing the tower.
function drop(tower: number[][]): [number, number[][]] {
    let tallest: {[key: string]: number} = {};  // Initialize an object to store the tallest point reached at each coordinate.
    let nTower: number[][] = [];  // Initialize an array to store the new positions of the bricks after falling.
    let falls = 0;  // Counter to track the number of bricks that fall.

    // Iterate over each brick in the tower.
    for (let brick of tower) {
      let nBrick = doFall(tallest, brick);  // Calculate the new position of the brick after falling.
      if (nBrick[2] !== brick[2]) falls++;  // If the brick's height changes, increment the fall counter.
      nTower.push(nBrick);  // Add the new brick position to the new tower array.

      // Update the tallest points on the grid based on the new brick position.
      for (let x = brick[0]; x <= brick[3]; x++) {
        for (let y = brick[1]; y <= brick[4]; y++) {
          tallest[[x, y].toString()] = nBrick[5];  // Set the new tallest height at each coordinate covered by the brick.
        }
      }
    }

    // Return the total number of falls and the new tower structure.
    return [falls, nTower];
}

// Function to solve the given problem with bricks.
// It takes a two-dimensional array of numbers representing bricks.
function solve(bricks: number[][]): void {
    // Sort the bricks based on their height (third element of each brick array).
    let sortedBricks = bricks.sort((a, b) => a[2] - b[2]);
  
    // Initialize variables for the new tower and the number of falls.
    let nTower: number[][] | null = null;
    let falls = 0;
  
    // Drop the sorted bricks and capture the number of falls and the new tower structure.
    [falls, nTower] = drop(sortedBricks);
  
    // Initialize counters for two parts of the problem.
    let [p1, p2] = [0, 0];
  
    // Iterate over each brick in the new tower.
    for (let idx in nTower) {
      // Create a temporary copy of the new tower.
      let tmpTower = [...nTower];
      // Remove one brick (at the current index) from the temporary tower.
      tmpTower.splice(parseInt(idx), 1); // Corrected method name to 'splice'.
      
      // Drop the bricks of the modified temporary tower and capture the number of falls.
      [falls, tmpTower] = drop(tmpTower);
  
      // If there are no falls, increment p1; otherwise, add the number of falls to p2.
      if (falls === 0) p1++;
      else p2 += falls;
    }
  
    // Output the results for part 1 and part 2 of the problem.
    console.log(' Part1:', p1);
    console.log(' Part2:', p2);
  }
  
  // Reading and processing the input file
  const input: number[][] = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.replace('~', ',').split(',').map(Number));
  
  // Display the input and solve the problem using the input.
  console.log('Input:');
  solve(input);
  