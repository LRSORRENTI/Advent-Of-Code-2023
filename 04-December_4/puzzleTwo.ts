import * as fs from 'fs';

// Define a custom type for the copies array
type CopiesArray = number[];

// Define a custom interface for the parsed line data
interface LineData {
    winning: string[];
    yours: string[];
}

const input_file = 'input.txt';
const fileContent = fs.readFileSync(input_file, 'utf8');
const lines = fileContent.split('\n');

const copies: CopiesArray = new Array(lines.length).fill(1);

let i = 0;
for (let line of lines) {
    const parts = line.split(': ');
    if (parts.length < 2) {
        continue; // Skip invalid lines
    }

    const parts2 = parts[1].split(' | ');
    const lineData: LineData = {
        winning: parts2[0].split(' '),
        yours: parts2[1].split(' ')
    };

    let score = 0;
    for (let x of lineData.yours) {
        if (lineData.winning.includes(x) && x !== '') {
            score += 1;
        }
    }

    for (let j = 0; j < score; j++) {
        if (i + j + 1 < copies.length) {
            copies[i + j + 1] += copies[i];
        }
    }

    i += 1;
}

console.log(copies);
console.log(copies.reduce((a, b) => a + b, 0));
