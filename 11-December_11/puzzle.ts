import * as fs from 'fs';

const input: string = fs.readFileSync('./input.txt', 'utf8').trimEnd();

interface Galaxy {
  row: number;
  col: number;
}

function galaxyLength(input: string, expansion: number): void {
  const image: number[][] = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));

  const absentRows: number[] = [];
  for (let i = 0; i < image.length; i++) {
    if (!image[i].some(Boolean)) {
      absentRows.push(i);
    }
  }

  const emptyCols: number[] = [];
  for (let j = 0; j < image[0].length; j++) {
    if (!image.map((row) => row[j]).some(Boolean)) {
      emptyCols.push(j);
    }
  }

  const galaxies: Galaxy[] = [];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j]) {
        galaxies.push({ row: i, col: j });
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    const firstGalaxy = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const secondGalaxy = galaxies[j];
      const rows = [firstGalaxy.row, secondGalaxy.row].sort((a, b) => a - b);
      const columns = [firstGalaxy.col, secondGalaxy.col].sort((a, b) => a - b);
      let numberOfCrosses = 0;
      for (const r of absentRows) {
        if (rows[0] < r && r < rows[1]) {
          numberOfCrosses++;
        }
      }
      for (const col of emptyCols) {
        if (columns[0] < col && col < columns[1]) {
          numberOfCrosses++;
        }
      }
      sum += rows[1] - rows[0] + columns[1] - columns[0] + numberOfCrosses * (expansion - 1);
    }
  }
  console.log(sum);
}

galaxyLength(input, 2);
galaxyLength(input, 1000000);
