const fs = require('fs');
// Define a custom type for time and distance
type TimeDistance = {
    time: number;
    distance: number;
}

// Define a custom interface for parsed data
interface ParsedData {
    timeDistance: TimeDistance;
}

// Function to parse the data from the file
const parseData = (filePath: string): ParsedData => {
    const data = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    const time = +data[0].split(":")[1].trim().replace(/\s\s+/g, '');
    const distance = +data[1].split(":")[1].trim().replace(/\s\s+/g, '');

    return { timeDistance: { time, distance } };
};

// Read and parse the data
const { timeDistance } = parseData('./data.txt');
const { time, distance } = timeDistance;

let result = 0;

for (let ms = 0; ms < time; ms++) {
    const dist = (time - ms) * ms;
    if (dist > distance) {
        result++;
    }
}

console.log(result);