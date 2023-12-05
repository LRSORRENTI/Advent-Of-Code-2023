import { readFileSync } from 'fs';

interface Map {
  name: string;
  ranges: Range[];
}

interface Range {
  source: number;
  dest: number;
  range: number;
}

const data: string[] = readFileSync('./input.txt', 'utf-8').split('\r\n');

const seeds: number[] = data[0].split(":")[1].trim().split(" ").map(e => +e);
const maps: Map[] = [];
let map: Map = { name: "", ranges: [] };

for (let i = 2; i < data.length; i++) {
    const line = data[i];

    if (line === '') {
        maps.push(map);
        map = { name: "", ranges: [] };
    }
    else if (line.endsWith("map:")) {
        map.name = line.split(" ")[0].split("-")[2];
    }
    else {
        const [dest, source, range] = line.split(" ").map(e => +e);
        map.ranges.push({ source, dest, range });
    }
}

let minSpot: number = Number.MAX_SAFE_INTEGER;

for (const seed of seeds) {
    let currentSeed = seed;
    for (const category of maps) {
        for (const i of category.ranges) {
            if (currentSeed >= i.source && currentSeed < i.source + i.range) {
                currentSeed = i.dest + currentSeed - i.source;
                break;
            }
        }
    }
    minSpot = Math.min(minSpot, currentSeed);
}

console.log("Lowest location: " + minSpot);
