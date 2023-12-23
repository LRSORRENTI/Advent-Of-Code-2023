const fs = require('fs');

const text = fs.readFileSync('input.txt', 'utf-8').split('\n');

interface GridType {
    [key: string]: string;
}

const grid: GridType = {};
text.forEach((line, x) => {
    line.split('').forEach((character, y) => {
        grid[`${x},${y}`] = character;
    });
});

const directions: { [key: string]: [number, number] } = {
    'v': [1, 0],
    '^': [-1, 0],
    '>': [0, 1],
    '<': [0, -1]
};

function* neighbors(x: number, y: number) {
    if (['v', '^', '>', '<'].includes(grid[`${x},${y}`])) {
        yield [x + directions[grid[`${x},${y}`]][0], y + directions[grid[`${x},${y}`]][1]];
        return;
    }

    for (const direction of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const dx = x + direction[0];
        const dy = y + direction[1];
        if (!grid.hasOwnProperty(`${dx},${dy}`) || grid[`${dx},${dy}`] === '#') {
            continue;
        }
        yield [dx, dy];
    }
}

function bfs(start: [number, number], end: [number, number]): number {
    const nodes: Array<[[number, number], Set<string>]> = [[start, new Set()]];
    const cost: { [key: string]: number } = {};
    cost[`${start[0]},${start[1]}`] = 0;

    while (nodes.length) {
        const [[x, y], path] = nodes.pop()!;

        if (x === end[0] && y === end[1]) {
            continue;
        }

        for (const neighbor of neighbors(x, y)) {
            const newCost = cost[`${x},${y}`] + 1;
            const neighborKey = `${neighbor[0]},${neighbor[1]}`;

            if (path.has(neighborKey)) {
                continue;
            }

            if (!cost.hasOwnProperty(neighborKey) || newCost > cost[neighborKey]) {
                cost[neighborKey] = newCost;
                const newPath = new Set(path);
                newPath.add(neighborKey);
                nodes.unshift([neighbor, newPath]);
            }
        }
    }

    return cost[`${end[0]},${end[1]}`];
}

const start: [number, number] = [0, 1];
const end: [number, number] = [140, 139];
console.log(bfs(start, end));

const gridArray: string[] = text;

function* newNeighbors(x: number, y: number) {
    for (const direction of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const dx = x + direction[0];
        const dy = y + direction[1];
        if (dx >= 0 && dx < gridArray[0].length && dy >= 0 && dy < gridArray.length) {
            if (gridArray[dy][dx] !== '#') {
                yield [dx, dy];
            }
        }
    }
}

function countLength(edges: { [key: string]: Array<[number, [number, number]]> }, start: [number, number], end: [number, number]): [number, [number, number]] {
    let count = 1;
    while (edges[`${end[0]},${end[1]}`].length === 2) {
        count++;
        const next = edges[`${end[0]},${end[1]}`].find((n) => `${n[1][0]},${n[1][1]}` !== `${start[0]},${start[1]}`)![1];
        start = end;
        end = next;
    }
    return [count, end];
}

function crossings() {
    const edges: { [key: string]: Array<[number, [number, number]]> } = {};
    for (let x = 0; x < gridArray.length; x++) {
        for (let y = 0; y < gridArray[0].length; y++) {
            if (gridArray[x][y] !== '#') {
                edges[`${y},${x}`] = Array.from(newNeighbors(y, x)).map(n => [1, n] as [number, [number, number]]);
            }
        }
    }

    const newEdges: { [key: string]: Array<[number, [number, number]]> } = {};
    for (const key in edges) {
        const [y, x] = key.split(',').map(Number);
        if (edges[key].length !== 2) {
            newEdges[key] = edges[key].map(n => countLength(edges, [y, x], n[1]));
        }
    }
    return newEdges;
}

function dfs(crossings: { [key: string]: Array<[number, [number, number]]> }, start: [number, number], end: [number, number]): number {
    const visited = new Set<string>();
    visited.add(`${start[0]},${start[1]}`);
    const stack: Array<[[number, number], number, Set<string>]> = [[start, 0, visited]];
    let maxLength = 0;

    while (stack.length) {
        const [current, pathLength, visited] = stack.pop()!;
        if (current[0] === end[0] && current[1] === end[1]) {
            maxLength = Math.max(maxLength, pathLength);
            continue;
        }

        for (const [length, neighbor] of crossings[`${current[0]},${current[1]}`] || []) {
            const neighborKey = `${neighbor[0]},${neighbor[1]}`;
            if (!visited.has(neighborKey)) {
                const newVisited = new Set(visited);
                newVisited.add(neighborKey);
                stack.push([neighbor, pathLength + length, newVisited]);
            }
        }
    }

    return maxLength;
}

const startDfs = (1, 0);
const endDfs = (gridArray[0].length - 2, gridArray.length - 1);
console.log(dfs(crossings(), startDfs, endDfs));
