"use strict";
exports.__esModule = true;
var fs = require("fs");
var filename = 'input.txt';
var result = 0;
var fileContent = fs.readFileSync(filename, 'utf8');
var lines = fileContent.split('\n');
lines.forEach(function (line) {
    var parts = line.split(': ');
    if (parts.length < 2) {
        return; // Skip invalid lines
    }
    var parts2 = parts[1].split(' | ');
    var winning = parts2[0].split(' ');
    var yours = parts2[1].split(' ');
    var score = 0;
    var seen = new Set();
    yours.forEach(function (x) {
        if (winning.includes(x) && x !== '') {
            seen.add(x);
            score = score === 0 ? 1 : score * 2;
        }
    });
    result += score;
    console.log(score);
});
console.log(result);
