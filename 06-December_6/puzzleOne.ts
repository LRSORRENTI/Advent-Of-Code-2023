const fs = require('fs');

// Define a custom type for an array of numbers
type NumberArray = number[];

// Define a custom interface for parsed data
interface ParsedData {
    times: NumberArray;
    distances: NumberArray;
}

// Function to parse the data from the file
const parseData = (filePath: string): ParsedData => {
    const data = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    const times: NumberArray = data[0].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map((e: string | number) => +e);
    const distances: NumberArray = data[1].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map((e: string | number) => +e);

    return { times, distances };
};

// Read and parse the data
const { times, distances } = parseData('./data.txt');

let result = 1;

for (let i = 0; i < times.length; i++) {
    let count = 0;
    for (let ms = 1; ms < times[i]; ms++) {
        const dist = (times[i] - ms) * ms;
        if (dist > distances[i]) {
            count++;
        }
    }
    result *= count;
}

console.log(result);

export default {};