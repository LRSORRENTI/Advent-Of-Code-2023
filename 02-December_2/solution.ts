import * as fs from 'fs';

// Assuming the file path is provided as the second command line argument
const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split("\n");

let i = 1;
let result = 0;
for (const line of lines) {
    const p = line.split(": ");
    i = parseInt(p[0].substring("Game ".length), 10);
    const rounds = p[1].split("; ");
    let r = 0, g = 0, b = 0;
    for (const round of rounds) {
        const parts = round.split(", ");
        for (const part of parts) {
            const els = part.split(" ");
            if (els[1] === "red") {
                r = Math.max(r, parseInt(els[0], 10));
            } else if (els[1] === "green") {
                g = Math.max(g, parseInt(els[0], 10));
            } else if (els[1] === "blue") {
                b = Math.max(b, parseInt(els[0], 10));
            }
        }
    }
    if (r <= 12 && g <= 13 && b <= 14) {
        result += i;
        console.log(`Game ${i} possible`);
    }
    i += 1;
}

console.log(result);
