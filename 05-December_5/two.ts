import { readFileSync } from 'fs';

interface Seed {
  start: number;
  end: number;
}

type Range = {
  source: number;
  dest: number;
  range: number;
}

type MapName = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location' | string;

interface Map {
  name: MapName;
  ranges: Range[];
}

const data: string[] = readFileSync('./input.txt', 'utf-8').split('\r\n');

const seedsData: number[] = data[0].split(":")[1].trim().split(" ").map(e => +e);
const seeds: Seed[] = [];

for (let i = 0; i < seedsData.length; i += 2) {
    const start = seedsData[i];
    const range = seedsData[i + 1];
    seeds.push({ start, end: start + range - 1 });
}

console.log(seeds);

const maps: Map[] = [];
let map: Map = { name: "", ranges: [] };

for (let i = 2; i < data.length; i++) {
    const line = data[i];

    if (line === '') {
        maps.push(map);
        map = { name: "", ranges: [] };
    }
    else if (line.endsWith("map:")) {
        map.name = line.split(" ")[0].split("-")[2] as MapName;
    }
    else {
        const [dest, source, range] = line.split(" ").map(e => +e);
        map.ranges.push({ source, dest, range });
    }
}

let miniLoc: number = Number.MAX_SAFE_INTEGER;

console.log("Starting seed processing...");

for (const seed of seeds) {
    console.log("Processing seed:", seed);
    for (let i = seed.start; i <= seed.end; i++) {
        let seed = i;
        for (const category of maps) {
            for (const j of category.ranges) {
                if (seed >= j.source && seed < j.source + j.range) {
                    seed = j.dest + seed - j.source;
                    break;
                }
            }
        }
        miniLoc = Math.min(miniLoc, seed);
    }
}

console.log("Processing complete lowest location: " + miniLoc);
