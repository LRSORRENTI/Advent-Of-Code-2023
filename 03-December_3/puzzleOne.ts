import * as fs from 'fs';
import * as path from 'path';

type Coordinate = string;  // Represents a coordinate as a string in the format "x,y"

interface GearNumbers {
    [key: Coordinate]: number[];  // Maps gear locations to an array of numbers
}

const Part1 = async (input: string): Promise<number> => {
    const grid: string[][] = input.split(/\n/g).map(line => line.split(''));
    let sum: number = 0;
    for (let y = 0; y < grid.length; y++) {
        let currentNumber: string = '';
        let checkNumber: boolean = false;
        let nearSymbol: boolean = false;
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x].match(/[0-9]/) && !checkNumber) {
                checkNumber = true;
                currentNumber = '';
                nearSymbol = false;
            }
            if ((x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) && checkNumber) {
                if (nearSymbol) sum += parseInt(currentNumber + (grid[y][x].match(/[0-9]/) ? grid[y][x] : ''));
                checkNumber = false;
            }
            if (checkNumber) {
                currentNumber += grid[y][x];
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;
                        if (y + j < 0 || y + j >= grid.length || x + i < 0 || x + i >= grid[y].length) continue;
                        if (!grid[y + j][x + i].match(/[0-9.]/)) nearSymbol = true;
                    }
                }
            }
        }
    }
    return sum;
};

const Part2 = async (input: string): Promise<number> => {
    const grid: string[][] = input.split(/\n/g).map(line => line.split(''));
    let gearNumbers: GearNumbers = {};
    for (let y = 0; y < grid.length; y++) {
        let currentNumber: string = '';
        let checkNumber: boolean = false;
        let gearLocation: Coordinate | null = null;
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x].match(/[0-9]/) && !checkNumber) {
                checkNumber = true;
                currentNumber = '';
                gearLocation = null;
            }
            if ((x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) && checkNumber) {
                if (gearLocation) {
                    if (!gearNumbers[gearLocation]) gearNumbers[gearLocation] = [];
                    gearNumbers[gearLocation].push(parseInt(currentNumber + (grid[y][x].match(/[0-9]/) ? grid[y][x] : '')));
                }
                checkNumber = false;
            }
            if (checkNumber) {
                currentNumber += grid[y][x];
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i == 0 && j == 0) continue;
                        if (y + j < 0 || y + j >= grid.length || x + i < 0 || x + i >= grid[y].length) continue;
                        const char = grid[y + j][x + i];
                        if (char == '*') {
                            gearLocation = `${x + i},${y + j}`;
                            if (!gearNumbers[gearLocation]) gearNumbers[gearLocation] = [];
                        }
                    }
                }
            }
        }
    }
    return Object.values(gearNumbers).reduce((sum, array) => {
        if (array.length == 2) sum += array[0] * array[1];
        return sum;
    }, 0);
};

async function main() {
    // Construct the path to the data file
    const dataFilePath = path.join(__dirname, 'data.txt');

    try {
        // Asynchronously read the file contents
        const inputData = await fs.promises.readFile(dataFilePath, 'utf8');
        
        // Use the inputData here
        // For example, passing it to your function
        const result = await Part1(inputData);
        const secondResult = await Part2(inputData);
        console.log(`Part One: ${result}, Part Two: ${secondResult}`);
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

main();


export { Part1, Part2 }; // Export both functions
