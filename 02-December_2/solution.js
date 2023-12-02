"use strict";
exports.__esModule = true;
var fs = require("fs");
// Assuming the file path is provided as the second command line argument
var data = fs.readFileSync(process.argv[2], 'utf8');
var lines = data.split("\n");
var i = 1;
var result = 0;
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var p = line.split(": ");
    i = parseInt(p[0].substring("Game ".length), 10);
    var rounds = p[1].split("; ");
    var r = 0, g = 0, b = 0;
    for (var _a = 0, rounds_1 = rounds; _a < rounds_1.length; _a++) {
        var round = rounds_1[_a];
        var parts = round.split(", ");
        for (var _b = 0, parts_1 = parts; _b < parts_1.length; _b++) {
            var part = parts_1[_b];
            var els = part.split(" ");
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
    if (r <= 12 && g <= 13 && b <= 14) {
        result += i;
        console.log("Game ".concat(i, " possible"));
    }
    i += 1;
}
console.log(result);
