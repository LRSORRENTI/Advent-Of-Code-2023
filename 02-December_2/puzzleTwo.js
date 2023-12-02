"use strict";
exports.__esModule = true;
var fs = require("fs");
// Assuming the file path is provided as the second command line argument
var data = fs.readFileSync(process.argv[2], 'utf8');
var lines = data.split("\n");
var i = 1;
var results = [];
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var p = line.split(": ");
    i = parseInt(p[0].substring("Game ".length), 10);
    var rounds = p[1].split("; ");
    var maxCubes = { red: 0, green: 0, blue: 0 };
    for (var _a = 0, rounds_1 = rounds; _a < rounds_1.length; _a++) {
        var round = rounds_1[_a];
        var parts = round.split(", ");
        for (var _b = 0, parts_1 = parts; _b < parts_1.length; _b++) {
            var part = parts_1[_b];
            var _c = part.split(" "), countStr = _c[0], color = _c[1];
            var count = parseInt(countStr, 10);
            if (color in maxCubes) {
                maxCubes[color] = Math.max(maxCubes[color], count);
            }
        }
    }
    results.push({ id: i, maxCubes: maxCubes });
}
var minGame = results.reduce(function (acc, curr) { return acc + curr.maxCubes.red * curr.maxCubes.green * curr.maxCubes.blue; }, 0);
console.log(minGame);
