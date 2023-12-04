import * as fs from 'fs';

const filename = 'input.txt';
let result = 0;

const fileContent = fs.readFileSync(filename, 'utf8');
const lines = fileContent.split('\n');

lines.forEach(line => {
    const parts = line.split(': ');
    if (parts.length < 2) {
        return; // Skip invalid lines
    }

    const parts2 = parts[1].split(' | ');
    const winning = parts2[0].split(' ');
    const yours = parts2[1].split(' ');
    let score = 0;
    const seen = new Set<string>();

    yours.forEach(x => {
        if (winning.includes(x) && x !== '') {
            seen.add(x);
            score = score === 0 ? 1 : score * 2;
        }
    });

    result += score;
    console.log(score);
});

console.log(result);
