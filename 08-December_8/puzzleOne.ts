import * as fs from 'fs';

// Define a custom type for node structure
type Node = {
    left: string;
    right: string;
};

// Read and process the file
const data: string[] = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

// Initialize nodes with the custom type
const nodes: Record<string, Node> = {};

// Process data to fill nodes
for(let i = 2; i < data.length; i++) {
    const lineSplit: string[] = data[i].split('=').map(e => e.trim());
    const nodeName: string = lineSplit[0];
    const [left, right]: string[] = lineSplit[1].substring(1, lineSplit[1].length - 1).split(',').map(e => e.trim());
    nodes[nodeName] = { left, right };
}

const moves: string = data[0];
let currentMove: number = 0;
let currentNode: string = 'AAA';
let steps: number = 0;

// Main logic to calculate steps
while(currentNode !== 'ZZZ') {
    currentNode = moves[currentMove] === 'R' ? nodes[currentNode].right : nodes[currentNode].left;
    currentMove = (currentMove + 1) === moves.length ? 0 : currentMove + 1;
    steps++;
}

console.log(steps);

export {};
