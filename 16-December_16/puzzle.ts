

import * as fs from 'fs';

const input: string = fs.readFileSync('./input.txt', 'utf8').trimEnd();

type EnergizedType = { [key: string]: Set<string> };

function getDefaultDict<T>() {
    return new Proxy({}, {
        get: (target: any, name) => name in target ? target[name] : new Set<T>()
    }) as EnergizedType;
}

let energized = getDefaultDict<string>();

const RIGHT: [number, number] = [1, 0];
const LEFT: [number, number] = [-1, 0];
const UP: [number, number] = [0, -1];
const DOWN: [number, number] = [0, 1];

type MovesType = { [key: string]: [number, number][] };

const MOVES: MovesType = {
    ".1,0": [RIGHT],
    ".-1,0": [LEFT],
    ".0,-1": [UP],
    ".0,1": [DOWN],

    "-1,0": [RIGHT],
    "--1,0": [LEFT],
    "-0,-1": [LEFT, RIGHT],
    "-0,1": [LEFT, RIGHT],

    "|1,0": [UP, DOWN],
    "|-1,0": [UP, DOWN],
    "|0,-1": [UP],
    "|0,1": [DOWN],

    "\\1,0": [DOWN],
    "\\-1,0": [UP],
    "\\0,-1": [LEFT],
    "\\0,1": [RIGHT],

    "/1,0": [UP],
    "/-1,0": [DOWN],
    "/0,-1": [RIGHT],
    "/0,1": [LEFT],
};

const tiles: string[][] = input.split('\n').map(line => line.split(''));

type Beam = [[number, number], [number, number]];

let beams: Beam[] = [[[-1, 0], RIGHT]];

let energizedMax = -1;

let beamStarts: Beam[] = [];

for (let y = 0; y < tiles.length; y++) {
    beamStarts.push([[-1, y], RIGHT] as Beam);
    beamStarts.push([[tiles[0].length, y], LEFT] as Beam);
}
for (let x = 0; x < tiles[0].length; x++) {
    beamStarts.push([[x, -1], DOWN] as Beam);
    beamStarts.push([[x, tiles.length], UP] as Beam);
}

beamStarts.forEach(beamStart => {
    energized = getDefaultDict<string>();
    beams = [beamStart];

    let debugCounter = 0;
    const debugLimit = 1000;

    while (beams.length > 0 && debugCounter < debugLimit) {
        const beamData = beams.pop();

        if (!beamData) {
            continue;
        }

        const [[beamX, beamY], dir] = beamData;
        const [x, y] = [beamX + dir[0], beamY + dir[1]];

        console.log(`Processing beam at (${x}, ${y}) with direction [${dir.toString()}]`);

        if (x < 0 || x >= tiles[0].length || y < 0 || y >= tiles.length) {
            console.log(`Beam out of bounds at (${x}, ${y}), skipping`);
            continue;
        }

        const key = `${x},${y}`;
        if (energized[key] && energized[key].has(dir.toString())) {
            console.log(`Beam already processed at (${x}, ${y}) in direction [${dir.toString()}], skipping`);
            continue;
        }

        console.log(`Energizing tile at (${x}, ${y})`);
        energized[key].add(dir.toString());

        MOVES[`${tiles[y][x]}${dir[0]},${dir[1]}`]?.forEach((newDir: [number, number]) => {
            console.log(`Adding new beam from (${x}, ${y}) in direction [${newDir.toString()}]`);
            beams.push([[x, y], newDir]);
        });

        debugCounter++;
        if (debugCounter >= debugLimit) {
            console.log("Debug limit reached, breaking out of the loop");
            break;
        }
    }

    energizedMax = Math.max(energizedMax, Object.keys(energized).length);
});

console.log(`Maximum number of energized tiles: ${energizedMax}`);

export {};
