"use strict";
exports.__esModule = true;
var fs = require("fs");
var input_file = 'input.txt';
var fileContent = fs.readFileSync(input_file, 'utf8');
var lines = fileContent.split('\n');
var copies = new Array(lines.length).fill(1);
var i = 0;
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var parts = line.split(': ');
    if (parts.length < 2) {
        continue; // Skip invalid lines
    }
    var parts2 = parts[1].split(' | ');
    var lineData = {
        winning: parts2[0].split(' '),
        yours: parts2[1].split(' ')
    };
    var score = 0;
    for (var _a = 0, _b = lineData.yours; _a < _b.length; _a++) {
        var x = _b[_a];
        if (lineData.winning.includes(x) && x !== '') {
            score += 1;
        }
    }
    for (var j = 0; j < score; j++) {
        if (i + j + 1 < copies.length) {
            copies[i + j + 1] += copies[i];
        }
    }
    i += 1;
}
console.log(copies);
console.log(copies.reduce(function (a, b) { return a + b; }, 0));
