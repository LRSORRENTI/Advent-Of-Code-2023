import * as fs from 'fs';

// Custom type for a sequence of numbers
type Sequence = number[];

// Custom interface for a function that processes sequences
interface SequenceProcessor {
  (sequence: Sequence): Sequence[];
}

const getAllSequencesToZero: SequenceProcessor = (starSequence: Sequence): Sequence[] => {
  let trackSequence: Sequence[] = [starSequence];
  let currentSeq: Sequence = [...starSequence];
  let nextSequence: Sequence = [];
  while (!currentSeq.every(num => num === 0)) {
    nextSequence = [];
    for (let j = 0; j < currentSeq.length - 1; j++) {
      if (j === currentSeq.length) {
        break;
      }
      const diff = currentSeq[j + 1] - currentSeq[j];
      nextSequence.push(diff);
    }
    trackSequence.push(nextSequence);
    currentSeq = nextSequence;
  }
  return trackSequence;
};

const updateSequence = (trackSequence: Sequence[]): void => {
  let seqVal = 0;
  for (let j = trackSequence.length - 2; j >= 0; j--) {
    const sequence = trackSequence[j];
    const updatedVal = sequence[sequence.length - 1] + seqVal;
    trackSequence[j].push(updatedVal);
    seqVal = updatedVal;
  }
};

const part1 = (file: string): number => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/);
  
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const sequence: Sequence = lines[i].split(' ').map(num => Number(num));
    let trackSequence: Sequence[] = getAllSequencesToZero(sequence);
    updateSequence(trackSequence);
    sum += trackSequence[0][trackSequence[0].length - 1];
  }
  return sum;
};

console.log(part1('input.txt'));
