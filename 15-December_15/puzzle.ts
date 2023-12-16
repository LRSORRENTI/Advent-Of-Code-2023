// https://adventofcode.com/2023/day/15

import * as fs from 'fs'

const puzzleOne = (file: string) => {
  const steps = fs.readFileSync(file, 'utf-8').split(',')

  let total = 0
  for (let i = 0; i < steps.length; i++) {
    let currentValue = 0
    const string = steps[i]
    for (let j = 0; j < steps[i].length; j++) {
      currentValue = ((currentValue + string.charCodeAt(j)) * 17) % 256
    }
    total += currentValue
  }
  console.log(total)
  return total
}

puzzleOne('input.txt')