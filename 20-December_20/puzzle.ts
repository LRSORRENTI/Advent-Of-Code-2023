import * as fs from 'fs';

const input: string = fs.readFileSync('./input.txt', 'utf8').trimEnd();

const greatestComDenom = (x: number, y: number): number => (!y ? x : greatestComDenom(y, x % y))
// This is a recursive function to calculate the greatest common denominator (GCD) of two numbers x and y.
// If y is 0, it returns x. Otherwise, it calls itself with y and the remainder of x divided by y

const lowestComMultRed = (x: number, y: number) => (x * y) / greatestComDenom(x, y)
// This function calculates the lowest common multiple (LCM) of two numbers x and y.
// It multiplies x and y, and then divides the result by their GCD.

const lowestComMult = (...arr: number[]) => [...arr].reduce((a, b) => lowestComMultRed(a, b))
// This function calculates the LCM of an array of numbers.
// It uses the reduce method to apply the lowestComMultRed function across the array, effectively finding 
// the LCM of all numbers in the array.

type Node =
  | {
      type: 'broadcaster'
      to: string[]
    }
  | { type: 'flip-flop'; label: string; state: boolean; to: string[] }
  | {
      type: 'conjunction'
      label: string
      memory: Record<string, boolean>
      to: string[]
    }

    // Node is a union type, meaning it can be one of several different shapes, each distinguished by a type property.
    // The first shape is an object with a type property of 'broadcaster' and a to property, which is an array of strings.
    // The second shape is an object with type: 'flip-flop', a label string, a state boolean, and a to array of strings.
    // The third shape is an object with type: 'conjunction', a label string, a memory object that records a set of key-value 
    // pairs where the keys and values are strings and booleans respectively, and a to array of strings.

class Machine {
  pulses: { low: number; high: number }
//  This pulses object tracks counts of 'low' and 'high' pulses.

  public static parse(input: string) {
    // Declares a static method parse that takes a string input. Being static, it can be called on the class itself, 
    // not on an instance of the class.

    // Below processes the input string: trims whitespace, splits it into lines, 
    //and maps each line to a Node object.
    const raw = input
      .trim()
      .split('\n')
      .map<Node>((l) => {
        const [first, rest] = l.trim().split(' -> ')
        const to = rest.split(', ')
        // If the first part of the line is 'broadcaster', it creates a broadcaster type Node
        if (first === 'broadcaster') return { type: 'broadcaster', to }
        // If the first part starts with '%', it creates a flip-flop type Node
        if (first.startsWith('%'))
          return {
            type: 'flip-flop',
            label: first.slice(1),
            state: false,
            to,
          }
        return { type: 'conjunction', label: first.slice(1), memory: {}, to }
      })

    raw.forEach((n) => {
    // Iterates over all nodes, processing only the ones of type conjunction
      if (n.type !== 'conjunction') return
      const inputs = raw.filter((n2) => 'to' in n2 && n2.to.includes(n.label))
      for (const i of inputs) {
        // For each conjunction node, it finds all nodes that link to it and initializes their memory
        if ('label' in i) {
          n.memory[i.label] = false
        }
      }
    })
    // initializes a map to store nodes
    const map = new Map<string, Node>()

    for (const n of raw) {
    // populate the map with nodes using label as a key
      if ('label' in n) map.set(n.label, n)
      else map.set('broadcaster', n)
    }
    // return a new instance of Machine with the node map
    return new Machine(map)
  }

//   The constructor for Machine. It initializes the map of nodes and sets the initial pulses values to zero.

  constructor(public map: Map<string, Node>) {
    this.pulses = { low: 0, high: 0 }
  }

//   Method that simulates pressing a button n times by calling pressOnce repeatedly
  pressN(n: number) {
    for (let i = 0; i < n; ++i) this.pressOnce()
    return this
  }

  highLowProduct() {
    // Returns the product of the high and low pulse counts
    return this.pulses.high * this.pulses.low
  }

  pressUntil(label: string) {
    // Simulates pressing a button until a specific label emits a true signal

    // Below Keeps a count of how many times the button is pressed and stops when the condition is met
    let i = 0
    let flag = false
    const fn = (l: string) => {
      if (l === label) {
        flag = true
      }
    }
    while (!flag) {
      ++i
      this.pressOnce(fn)
    }
    return i
  }
// Below Simulates pressing the button once and optionally takes a callback to execute when a label emits a true signal.
  pressOnce(onLabelEmitTrue?: (label: string) => void) {
    // false = low, true = high
    type Pulse = [label: string, type: boolean, from: string]
    // Defines a Pulse type and initializes a queue with a pulse from the 'button' to 'broadcaster
    const queue: Pulse[] = [['broadcaster', false, 'button']]
    // Processes each pulse in the queue, updating the pulse counts.
    while (queue.length) {
      const [label, pulseType, from] = queue.shift()!
      pulseType ? this.pulses.high++ : this.pulses.low++
      const item = this.map.get(label)
      if (!item) {
        // Retrieves the node corresponding to the current pulse label
        continue
      }
      switch (item.type) {
        // Depending on the node type (broadcaster, flip-flop, conjunction), it processes the pulse differently
        case 'broadcaster': {
          item.to.forEach((l) => {
            queue.push([l, false, label])
          })
          break
        }
        case 'flip-flop': {
          if (pulseType === true) continue
          item.state = !item.state
          item.to.forEach((l) => {
            queue.push([l, item.state, label])
          })
          break
        }
        case 'conjunction': {
          item.memory[from] = pulseType
          const nextPulse = !Object.values(item.memory).every((b) => b === true)
          if (nextPulse) onLabelEmitTrue?.(label)
          item.to.forEach((l) => {
            queue.push([l, nextPulse, label])
          })
          break
        }
      }
    }
  }

  clone(): Machine {
    // Creates and returns a deep copy of the current Machine instance.
    return new Machine(structuredClone(this.map))
  }
}

// It parses the input to create a Machine instance, presses a button on it 1000 times (pressN(1000)), and then calculates the product 
// of the high and low pulse counts (highLowProduct()).
  
const puzzleOne = (input: string) =>
Machine.parse(input).pressN(1000).highLowProduct()

  console.log(puzzleOne(input))

  const puzzleTwo = (input: string) => {
  const machine = Machine.parse(input)
//   Parses the input into a Machine instance and then converts its map property into an array of entries (key-value pairs).
  const entries = Array.from(machine.map.entries())
//   Searches the entries for a node whose to array includes the string 'rx', and extracts its label
  const [toRxLabel] = entries.find(([, node]) => node.to.includes('rx'))!

  return lowestComMult(
// Filters the entries to those that include toRxLabel in their to array.
// Maps these filtered entries to their labels.
// For each label, it clones the machine and calls pressUntil with that label, which returns the number of presses needed to reach that label.
    ...entries
      .filter(([, node]) => node.to.includes(toRxLabel))
      .map(([label]) => label)
      .map((labelToFind) => machine.clone().pressUntil(labelToFind)),
  )
}

console.log(puzzleTwo(input))