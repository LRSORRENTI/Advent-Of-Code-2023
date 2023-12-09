import * as fs from 'fs';

// Custom type for a sequence of numbers
type NumberSequence = number[];

// Custom interface for a function that processes sequences
interface SequenceFunction {
  (sequence: NumberSequence): NumberSequence[];
}

const seqToZero: SequenceFunction = (starSequence: NumberSequence): NumberSequence[] => {
  let seqTrack: NumberSequence[] = [starSequence];
  let currSequence: NumberSequence = [...starSequence];
  let newSeq: NumberSequence = [];
  while (!currSequence.every(num => num === 0)) {
    newSeq = [];
    for (let j = 0; j < currSequence.length - 1; j++) {
      if (j === currSequence.length) {
        break;
      }
      const diff = currSequence[j + 1] - currSequence[j];
      newSeq.push(diff);
    }
    seqTrack.push(newSeq);
    currSequence = newSeq;
  }
  return seqTrack;
};

const updateSequence = (seqTrack: NumberSequence[]): void => {
  let carryVal = 0;
  for (let j = seqTrack.length - 2; j >= 0; j--) {
    const sequence = seqTrack[j];
    const newVal = sequence[0] - carryVal;
    seqTrack[j].unshift(newVal);
    carryVal = newVal;
  }
};

const puzTwo = (file: string): number => {
  const lines = fs.readFileSync(file, 'utf-8').split(/[\n\r]+/);
  
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const sequence: NumberSequence = lines[i].split(' ').map(num => Number(num));
    let seqTrack: NumberSequence[] = seqToZero(sequence);
    updateSequence(seqTrack);
    sum += seqTrack[0][0];
  }
  return sum;
};

console.log(puzTwo('input.txt'));
