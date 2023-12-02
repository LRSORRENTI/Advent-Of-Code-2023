"use strict";
exports.__esModule = true;
var fs = require("fs");
// Reading the file specified in the second command line argument and converting it to a string
var data = fs.readFileSync(process.argv[2], 'utf8');
// Splitting the file content into lines
var lines = data.split("\n");
// Initializing variables: 'i' as a game counter starting at 1, and 'result' to accumulate the result
var i = 1;
var result = 0;
// Iterating over each line in the file
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    // Splitting each line into parts using ": " as delimiter
    var p = line.split(": ");
    // Parsing the game number from the first part and converting it to an integer
    i = parseInt(p[0].substring("Game ".length), 10);
    // Splitting the second part into rounds using "; " as delimiter
    var rounds = p[1].split("; ");
    // Initializing counters for red, green, and blue cubes
    var r = 0, g = 0, b = 0;
    // Iterating over each round in a game
    for (var _a = 0, rounds_1 = rounds; _a < rounds_1.length; _a++) {
        var round = rounds_1[_a];
        // Splitting each round into parts using ", " as delimiter
        var parts = round.split(", ");
        for (var _b = 0, parts_1 = parts; _b < parts_1.length; _b++) {
            var part = parts_1[_b];
            // Splitting each part into the number of cubes and their color
            var els = part.split(" ");
            // Updating the maximum count for each color
            if (els[1] === "red") {
                r = Math.max(r, parseInt(els[0], 10));
            }
            else if (els[1] === "green") {
                g = Math.max(g, parseInt(els[0], 10));
            }
            else if (els[1] === "blue") {
                b = Math.max(b, parseInt(els[0], 10));
            }
        }
    }
    // Checking if the maximum counts for all colors are within specified limits
    if (r <= 12 && g <= 13 && b <= 14) {
        // Adding the game number to the result if the condition is met
        result += i;
        // Logging a message indicating that the game is 'possible'
        console.log("Game ".concat(i, " possible"));
    }
    // Incrementing the game counter
    i += 1;
}
// Logging the final result
console.log(result);
