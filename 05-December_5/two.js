"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./input.txt', 'utf-8').split('\r\n');
var seedsData = data[0].split(":")[1].trim().split(" ").map(function (e) { return +e; });
var seeds = [];
for (var i = 0; i < seedsData.length; i += 2) {
    var start = seedsData[i];
    var range = seedsData[i + 1];
    seeds.push({ start: start, end: start + range - 1 });
}
console.log(seeds);
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
var miniLoc = Number.MAX_SAFE_INTEGER;
console.log("Starting seed processing...");
for (var _i = 0, seeds_1 = seeds; _i < seeds_1.length; _i++) {
    var seed = seeds_1[_i];
    console.log("Processing seed:", seed);
    for (var i = seed.start; i <= seed.end; i++) {
        var seed_1 = i;
        for (var _b = 0, maps_1 = maps; _b < maps_1.length; _b++) {
            var category = maps_1[_b];
            for (var _c = 0, _d = category.ranges; _c < _d.length; _c++) {
                var j = _d[_c];
                if (seed_1 >= j.source && seed_1 < j.source + j.range) {
                    seed_1 = j.dest + seed_1 - j.source;
                    break;
                }
            }
        }
        miniLoc = Math.min(miniLoc, seed_1);
    }
}
console.log("Processing complete lowest location: " + miniLoc);
