import * as fs from 'fs';

interface Direction {
  U: [number, number];
  R: [number, number];
  D: [number, number];
  L: [number, number];
}

const DIR: Direction = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const input: string = fs.readFileSync('./input.txt', 'utf8').trimEnd();

function solve(input: string): void {
  let start: [number, number] | null = null; 
  const map: string[][] = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      }
      return char;
    })
  );

  if (start === null) {
    throw new Error('Start position not found in input');
  }

  let dir: [number, number] | null = null;
  let startingPipe: string;
  outer: {
    switch (map[start[0] - 1][start[1]]) {
      case '|':
      case '7':
      case 'F':
        dir = DIR.U;
        switch (map[start[0]][start[1] + 1]) {
          case '-':
          case 'J':
          case '7':
            startingPipe = 'L';
            break outer;
        }
        switch (map[start[0] + 1][start[1]]) {
          case '|':
          case 'L':
          case 'J':
            startingPipe = '|';
            break outer;
        }
        startingPipe = 'J';
        break outer;
    }
    switch (map[start[0]][start[1] + 1]) {
      case '-':
      case 'J':
      case '7':
        dir = DIR.R;
        switch (map[start[0] + 1][start[1]]) {
          case '|':
          case 'L':
          case 'J':
            startingPipe = 'F';
            break outer;
        }
        startingPipe = '-';
        break outer;
    }
    startingPipe = '7';
  }

  if (dir === null) {
    throw new Error('Initial direction not determined');
  }

  const path: [number, number][] = [start];
  let [i, j]: [number, number] = start;
  do {
    switch (map[i][j]) {
      case '|':
      case '-':
        break;
      case 'L':
        dir = dir === DIR.D ? DIR.R : DIR.U;
        break;
      case 'J':
        dir = dir === DIR.D ? DIR.L : DIR.U;
        break;
      case '7':
        dir = dir === DIR.U ? DIR.L : DIR.D;
        break;
      case 'F':
        dir = dir === DIR.U ? DIR.R : DIR.D;
        break;
    }
    const [di, dj] = dir;
    i += di;
    j += dj;
    path.push([i, j]);
  } while (map[i][j] !== 'S');
  console.log(~~(path.length / 2));

  map[start[0]][start[1]] = startingPipe;

  const mapPath: number[][] = map.map((row) => row.map(() => 0));
  const iMinimum: number = Math.min(...path.map(([i]) => i));
  const jMinimum: number = Math.min(...path.map(([, j]) => j));
  const iMax_theatre: number = Math.max(...path.map(([i]) => i));
  const jMaximum: number = Math.max(...path.map(([, j]) => j));
  for (const [i, j] of path) {
    mapPath[i][j] = 1;
  }
  let numTiles: number = 0;
  for (let i = iMinimum; i <= iMax_theatre; i++) {
    let numIntersections: number = 0;
    let curve: string | null = null;
    for (let j = jMinimum; j <= jMaximum; j++) {
      if (mapPath[i][j]) {
        const current: string = map[i][j];
        if (current === '|') {
          numIntersections++;
        } else if (current !== '-') {
          if (curve) {
            if (
              (curve === 'L' && current === '7') ||
              (curve === 'F' && current === 'J')
            ) {
              numIntersections++;
            }
            curve = null;
          } else {
            curve = current;
          }
        }
      } else if (numIntersections % 2) {
        numTiles++;
      }
    }
  }
  console.log(numTiles);
}

solve(input);
