import * as fs from 'fs';
// Define a custom type for DataPattern
type DataPattern = number[];

// Define a custom interface for ConditionRecord
interface ConditionRecord {
  condition: string;
  dataPattern: DataPattern;
}

// Read input file
const input: string = fs.readFileSync('./input.txt', 'utf8').trimEnd();

// Function to read and split input data
const readData = (input: string): string[] => input.trim().split("\n");

// Function to parse input data into ConditionRecord array
const parseData = (input: string): ConditionRecord[] =>
  readData(input).map((line) => {
    const [condition, dataPatternString] = line.split(" ");
    const dataPattern: DataPattern = dataPatternString.split(",").map((x) => parseInt(x));
    return { condition, dataPattern };
  });

// Cache for storing calculated results
const dataCache: Map<string, number> = new Map();

// Function to track the total possible arrangements
const trackTotalPossibleArrangements = (dataRow: string, dataPattern: DataPattern): number => {
  // remove . from start / end of dataRow
  dataRow = dataRow.replace(/^\.+|\.+$/g, "");

  if (dataRow === "") {
    return dataPattern.length ? 0 : 1;
  }

  if (!dataPattern.length) {
    return dataRow.includes("#") ? 0 : 1;
  }

  const key: string = [dataRow, dataPattern.join(",")].join(" ");
  if (dataCache.has(key)) {
    return dataCache.get(key) || 0;
  }

  let arrangementData: number = 0;

  // Get the next broken springs
  const broken = dataRow.match(/^#+(?=\.|$)/);
  if (broken) {
    if (broken[0].length === dataPattern[0]) {
      arrangementData += trackTotalPossibleArrangements(
        dataRow.slice(dataPattern[0]),
        dataPattern.slice(1)
      );
    }
  } else if (dataRow.includes("?")) {
    // Keep going
    arrangementData += trackTotalPossibleArrangements(dataRow.replace("?", "."), dataPattern);
    arrangementData += trackTotalPossibleArrangements(dataRow.replace("?", "#"), dataPattern);
  }

  dataCache.set(key, arrangementData);
  return arrangementData;
};

// Main function to calculate the puzzle
const puzzleOne = (input: string): number => {
  const conditionRecords: ConditionRecord[] = parseData(input);

  let numberOfPossibleArrangements: number = 0;
  for (const record of conditionRecords) {
    const arrangementData: number = trackTotalPossibleArrangements(record.condition, record.dataPattern);
    numberOfPossibleArrangements += arrangementData;
  }
  console.log(numberOfPossibleArrangements);
  return numberOfPossibleArrangements;
};

const puzzleTwo = (input: string): number => {
  const conditionRecords: ConditionRecord[] = parseData(input).map(({ condition, dataPattern }) => ({
    condition: Array(5).fill(condition).join("?"),
    dataPattern: Array(5).fill(dataPattern).flat()
  }));

  let numberOfPossibleArrangements: number = 0;
  for (const { condition, dataPattern } of conditionRecords) {
    const arrangements: number = trackTotalPossibleArrangements(condition, dataPattern);
    numberOfPossibleArrangements += arrangements;
  }
  console.log(numberOfPossibleArrangements);
  return numberOfPossibleArrangements;
};


puzzleOne(input);
puzzleTwo(input);
