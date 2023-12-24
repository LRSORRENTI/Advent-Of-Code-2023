const fs = require('fs')
// Define a type for coordinates (x, y)
type Coordinates = [number, number];

// Define an interface for the input data
interface InputData {
    position: Coordinates;
    velocity: Coordinates;
}

// Read and parse the input file
const parseInputFile = (filePath: string): InputData[] => {
    const inputText = fs.readFileSync(filePath, 'utf-8').trim();
    return inputText.split('\n').map((line: string) => {
        const [positionPart, velocityPart] = line.split('@');
        const position = positionPart.split(',').map((i: string) => Number(i.trim())) as Coordinates;
        const velocity = velocityPart.split(',').map((i: string) => Number(i.trim())) as Coordinates;
        return { position, velocity };
    });
}

const input = parseInputFile('input.txt');

// Function to test intersection
const testIntersection = (i: number, j: number, min: number, max: number): boolean => {
    const { position: p1, velocity: v1 } = input[i];
    const { position: p2, velocity: v2 } = input[j];

    const m1 = v1[1] / v1[0];
    const m2 = v2[1] / v2[0];
    const x = (m1 * p1[0] - m2 * p2[0] + p2[1] - p1[1]) / (m1 - m2);
    const y = m1 * (x - p1[0]) + p1[1];

    const tA = (x - p1[0]) / v1[0];
    const tB = (x - p2[0]) / v2[0];

    const inFuture = tA > 0 && tB > 0;
    const inArea = x >= min && x <= max && y >= min && y <= max;

    return inArea && inFuture;
}

// Part one
let sumPartOne = 0;
let start: number = 1;
for (let i = 0; i < input.length - 1; ++i) {
    for (let j: number = start; j < input.length; ++j) {
        sumPartOne += testIntersection(i, j, 200000000000000, 400000000000000) ? 1 : 0;
    }
    ++start;
}
console.log('Solution to part one:', sumPartOne);

