var fs = require('fs');
// Read and parse the input file
var parseInputFile = function (filePath) {
    var inputText = fs.readFileSync(filePath, 'utf-8').trim();
    return inputText.split('\n').map(function (line) {
        var _a = line.split('@'), positionPart = _a[0], velocityPart = _a[1];
        var position = positionPart.split(',').map(function (i) { return Number(i.trim()); });
        var velocity = velocityPart.split(',').map(function (i) { return Number(i.trim()); });
        return { position: position, velocity: velocity };
    });
};
var input = parseInputFile('input.txt');
// Function to test intersection
var testIntersection = function (i, j, min, max) {
    var _a = input[i], p1 = _a.position, v1 = _a.velocity;
    var _b = input[j], p2 = _b.position, v2 = _b.velocity;
    var m1 = v1[1] / v1[0];
    var m2 = v2[1] / v2[0];
    var x = (m1 * p1[0] - m2 * p2[0] + p2[1] - p1[1]) / (m1 - m2);
    var y = m1 * (x - p1[0]) + p1[1];
    var tA = (x - p1[0]) / v1[0];
    var tB = (x - p2[0]) / v2[0];
    var inFuture = tA > 0 && tB > 0;
    var inArea = x >= min && x <= max && y >= min && y <= max;
    return inArea && inFuture;
};
// Part one
var sumPartOne = 0;
var start = 1;
for (var i = 0; i < input.length - 1; ++i) {
    for (var j = start; j < input.length; ++j) {
        sumPartOne += testIntersection(i, j, 200000000000000, 400000000000000) ? 1 : 0;
    }
    ++start;
}
console.log('Solution to part one:', sumPartOne);
