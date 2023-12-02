import * as fs from 'fs';
// Reading the file specified in the second command line argument and converting it to a string
const data = fs.readFileSync(process.argv[2], 'utf8');
// Splitting the file content into lines
const lines = data.split("\n");

// Initializing variables: 'i' as a game counter starting at 1, and 'result' to accumulate the result
let i = 1;
let result = 0;

// Iterating over each line in the file
for (const line of lines) {
    // Splitting each line into parts using ": " as delimiter
    const p = line.split(": ");
    // Parsing the game number from the first part and converting it to an integer
    i = parseInt(p[0].substring("Game ".length), 10);
    // Splitting the second part into rounds using "; " as delimiter
    const rounds = p[1].split("; ");

    // Initializing counters for red, green, and blue cubes
    let r = 0, g = 0, b = 0;

    // Iterating over each round in a game
    for (const round of rounds) {
        // Splitting each round into parts using ", " as delimiter
        const parts = round.split(", ");
        for (const part of parts) {
            // Splitting each part into the number of cubes and their color
            const els = part.split(" ");
            // Updating the maximum count for each color
            if (els[1] === "red") {
                r = Math.max(r, parseInt(els[0], 10));
            } else if (els[1] === "green") {
                g = Math.max(g, parseInt(els[0], 10));
            } else if (els[1] === "blue") {
                b = Math.max(b, parseInt(els[0], 10));
            }
        }
    }

    // Checking if the maximum counts for all colors are within specified limits
    if (r <= 12 && g <= 13 && b <= 14) {
        // Adding the game number to the result if the condition is met
        result += i;
        // Logging a message indicating that the game is 'possible'
        console.log(`Game ${i} possible`);
    }

    // Incrementing the game counter
    i += 1;
}

// Logging the final result
console.log(result);
