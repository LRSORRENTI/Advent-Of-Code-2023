"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./input.txt', 'utf-8').split('\r\n');
var seeds = data[0].split(":")[1].trim().split(" ").map(function (e) { return +e; });
var maps = [];
var map = { name: "", ranges: [] };
for (var i = 2; i < data.length; i++) {
    var line = data[i];
    if (line === '') {
        maps.push(map);
        map = { name: "", ranges: [] };
    }
    else if (line.endsWith("map:")) {
        map.name = line.split(" ")[0].split("-")[2];
    }
    else {
        var _a = line.split(" ").map(function (e) { return +e; }), dest = _a[0], source = _a[1], range = _a[2];
        map.ranges.push({ source: source, dest: dest, range: range });
    }
}
var minSpot = Number.MAX_SAFE_INTEGER;
for (var _i = 0, seeds_1 = seeds; _i < seeds_1.length; _i++) {
    var seed = seeds_1[_i];
    var currentSeed = seed;
    for (var _b = 0, maps_1 = maps; _b < maps_1.length; _b++) {
        var category = maps_1[_b];
        for (var _c = 0, _d = category.ranges; _c < _d.length; _c++) {
            var i = _d[_c];
            if (currentSeed >= i.source && currentSeed < i.source + i.range) {
                currentSeed = i.dest + currentSeed - i.source;
                break;
            }
        }
    }
    minSpot = Math.min(minSpot, currentSeed);
}
console.log("Lowest location: " + minSpot);
