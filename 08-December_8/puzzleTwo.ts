import * as fs from 'fs';

// Define a custom interface for node structure
interface Node {
    left: string;
    right: string;
}

// Define a custom interface for current nodes
interface CurrentNode {
    node: string;
    endStep: number;
    ended: boolean;
}

// Read and process the file
const data: string[] = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

// Initialize nodes with the custom type
const nodes: Record<string, Node> = {};

// Initialize current nodes array with the custom interface
const currNodes: CurrentNode[] = [];

for(let i = 2; i < data.length; i++) {
    const lineSplit: string[] = data[i].split('=').map(e => e.trim());
    const nodeName: string = lineSplit[0];

    if(nodeName[2] === 'A') {
        currNodes.push({ node: nodeName, endStep: 0, ended: false });
    }

    const [left, right]: string[] = lineSplit[1].substring(1, lineSplit[1].length - 1).split(',').map(e => e.trim());
    nodes[nodeName] = { left, right };
}

const moves: string = data[0];
let currentMove: number = 0;
let steps: number = 0;

while(!currNodes.every(e => e.ended)) {
    for(let i = 0; i < currNodes.length; i++) {
        if(currNodes[i].ended) {
            continue;
        }

        currNodes[i].node = moves[currentMove] === 'R' ? nodes[currNodes[i].node].right : nodes[currNodes[i].node].left;

        if(currNodes[i].node.endsWith('Z')) {
            currNodes[i].ended = true;
            currNodes[i].endStep = steps + 1;
        }
    }

    currentMove = (currentMove + 1) === moves.length ? 0 : currentMove + 1;
    steps++;
}

// greatest common multiple

function greatestCommonMult(a: number, b: number): number {
    if(a < b) {
        const tmp = b;
        b = a;
        a = tmp;
    }
    const t = a % b;
    return t ? greatestCommonMult(b, t) : b;
}




// Least common multiple
function lowestCommonMult(arr: number[]): number {
    let n = 1;
    for(let i = 0; i < arr.length; i++) {
        n = arr[i] / greatestCommonMult(arr[i], n) * n;
    }
    return n;
}


// Find lowestCommonMult of all end steps
const endSteps: number[] = currNodes.map(e => e.endStep);
console.log(lowestCommonMult(endSteps));

