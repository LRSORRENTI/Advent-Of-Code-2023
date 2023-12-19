
import { cloneDeep, sum } from 'lodash/fp'
import * as path from 'path';
import fs from 'fs';

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return '';
    }
};

const inputFilePath = path.join(__dirname, 'input.txt');

const input = readInputFile(inputFilePath);

console.log(input)



// Define a function to calculate the product of an array of numbers.
const product = (nums: number[]) => nums.reduce((a, b) => a * b, 1);

// Define a type 'Insert' which can be either a 'compare' or 'goto' operation.
type Insert =
  | {
      type: 'compare';
      property: 0 | 1 | 2 | 3; // 0=x, 1=m, 2=a, 3=s
      operation: '<' | '>';
      vn: number;
      into: string;
    }
  | { type: 'goto'; into: string };

// Define a type 'Alloy' as a tuple of four numbers.
type Alloy = [number, number, number, number];

// Define a function to decipher a given input string.
const decipher = (input: string) => {
  // Split the input into rules and alloy sections.
  const [neRules, neAlloy] = input.trim().split('\n\n');

  // Define regex patterns for parsing the input.
  const regex = /(\w+){(.*)}/;
  const insertRegex = /(\w+)([<>])(\d+)/;

  // Process each rule to map identities to their inserts.
  const requirements = neRules.split('\n').reduce((map, rule) => {
    // Extract the identity and its associated rogue inserts.
    const [identity, rogueInserts] = rule.match(regex)!.slice(1);

    // Process each insert string into an Insert object.
    const inserts = rogueInserts.split(',').map<Insert>((rogueInsert) => {
      // Handle 'goto' type inserts.
      if (rogueInsert.indexOf(':') === -1) return { type: 'goto', into: rogueInsert.trim() };

      // Process 'compare' type inserts.
      const [fnc, into] = rogueInsert.trim().split(':');
      const [property, operand, value] = fnc.match(insertRegex)!.slice(1);

      return {
        type: 'compare',
        into,
        property: ['x', 'm', 'a', 's'].indexOf(property) as 0 | 1 | 2 | 3,
        operation: operand as '<' | '>',
        vn: Number(value),
      };
    });

    // Add the identity and its inserts to the map.
    map.set(identity, inserts);

    return map;
  }, new Map<string, Insert[]>());

  // Process each line in the alloy section to create Alloy objects.
  const alloys = neAlloy.split('\n').map((raw) => {
    // Extract the variables and their values.
    const vars = raw.matchAll(/(\w)=(\d+)/g);
    const o: Alloy = [0, 0, 0, 0];
    for (const [, k, vn] of vars) o[['x', 'm', 'a', 's'].indexOf(k)] = Number(vn);
    return o;
  });

  // Return the processed requirements and alloys.
  return { requirements, alloys };
};

// Define a type 'Range' as a tuple of two numbers.
type Range = [number, number];

// Define a type 'Zig' with an identity and a set of ranges for x, m, a, and s.
type Zig = {
  identity: string;
  ranges: [x: Range, m: Range, a: Range, s: Range];
};

// Define a function to return a range of type 'A' from the given requirements.
const returnRangeA = (requirements: ReturnType<typeof decipher>['requirements']) => {
  // Initialize a list of 'Zig' objects with default ranges.
  const zigs: Zig[] = [
    {
      identity: 'in',
      ranges: [
        [1, 4000],
        [1, 4000],
        [1, 4000],
        [1, 4000],
      ],
    },
  ];

  // Initialize an empty list to store processed 'Zig' objects.
  const zags: Zig[] = [];

  // Process each 'Zig' until the list is empty.
  while (zigs.length) {
    // Pop the last 'Zig' from the list and process it.
    const branch = zigs.pop()!;
    zags.push(branch);

    // Skip further processing if the identity is 'A' or 'R'.
    if (branch.identity === 'A' || branch.identity === 'R') {
      continue;
    }

    // Retrieve instructions for the current identity.
    const instructions = requirements.get(branch.identity)!;
    const ranges = cloneDeep(branch.ranges);

    // Iterate over each instruction and process it.
    for (let i = 0; i < instructions.length; ++i) {
      const inserts = instructions[i];
      if (inserts.type === 'compare') {
        // Create a deep copy of ranges for modification.
        const nextRanges = cloneDeep(ranges);

        // Determine the index for adjustment based on the operation.
        const n = inserts.operation === '<' ? 1 : 0;

        // Adjust the range for the specified property.
        nextRanges[inserts.property][n] = inserts.vn + (n === 1 ? -1 : 1);
        ranges[inserts.property][1 - n] = inserts.vn;

        // Add a new 'Zig' with the updated ranges to the list.
        zigs.push({
          identity: inserts.into,
          ranges: nextRanges,
        });
      } else {
        // For 'goto' type, add a new 'Zig' with the same ranges.
        zigs.push({
          identity: inserts.into,
          ranges,
        });
      }
    }
  }

  // Filter 'Zags' for those with identity 'A' and return their ranges.
  return zags.filter((cb) => cb.identity === 'A').map((cb) => cb.ranges);
};


 const puzzleOne = (input: string) => {
  const { requirements, alloys } = decipher(input)
  const ranges = returnRangeA(requirements)

  const isIn = (x: number, r: Range) => x >= r[0] && x <= r[1]
 console.log(sum(
    alloys
      .filter((m) => ranges.some((r) => r.every((r, i) => isIn(m[i], r))))
      .map((o) => sum(o)),
  ))
  return sum(
    alloys
      .filter((m) => ranges.some((r) => r.every((r, i) => isIn(m[i], r))))
      .map((o) => sum(o)),
  )
}

const puzzleTwo = (input: string) => {
  const { requirements } = decipher(input)
  const ranges = returnRangeA(requirements)
  console.log(sum(
    ranges.map((b) => {
      const diffs = b.map((r) => r[1] - r[0] + 1)
      return product(diffs)
    }),
  ))
  return sum(
    ranges.map((b) => {
      const diffs = b.map((r) => r[1] - r[0] + 1)
      return product(diffs)
    }),
  )
}

const inputDat = `
hard coded input file inside here 
`

puzzleOne(inputDat)
puzzleTwo(inputDat)