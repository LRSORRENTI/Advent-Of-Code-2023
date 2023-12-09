import * as fs from 'fs';

// Define a custom type for the array of numbers
type NumberArray = number[];

const data: string[] = fs.readFileSync('./data.txt', 'utf-8').split('\r\n');

let total: number = 0;

for (const line of data) {
    let dataLog: NumberArray = line.split(' ').map(e => +e);
    const lastValues: NumberArray = [];

    while (!dataLog.every(e => e === 0)) {
        const nextArr: NumberArray = [];
        for (let i = 1; i < dataLog.length; i++) {
            nextArr.push(dataLog[i] - dataLog[i - 1]);
        }
        lastValues.push(dataLog[dataLog.length - 1]);
        dataLog = nextArr;
    }

    total += lastValues.reduce((a, c) => a + c, 0);
}

console.log(total);
