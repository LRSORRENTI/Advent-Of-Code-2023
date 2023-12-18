import fs from 'fs';

// Custom type for mode
type ParseMode = 'normal' | 'color';

// Custom interface for parsed data
interface ParsedData {
  direction: string;
  steps: number;
  color?: string; // Optional, used only in 'color' mode
}

const readInputFile = (filePath: string): string => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error('Error reading file:', err);
      return '';
    }
};

const data = (input: string, mode: ParseMode): ParsedData[] =>
  input
    .trim()
    .split('\n')
    .map((layer) => {
      const [direction, steps, color] = layer.match(regex)!.slice(1)
      switch (mode) {
        case 'normal':
          return { direction, steps: Number(steps) }
        case 'color':
          return {
            direction: ['R', 'D', 'L', 'U'][Number(color[5])],
            steps: parseInt(color.slice(0, 5), 16),
          }
      }
    })

const regex = /(\w) (\d+) \(#([\w\d]+)\)/
