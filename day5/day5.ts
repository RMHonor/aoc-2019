import fs from 'fs';

const part1 = (program: number[], input: number): number => {
  const state = [...program];
  let i = 0;
  let output = 0;
  while (i < state.length) {
    // read through next instruction
    // parse opcode
    // parse modes
    // move on appropriately
    const op = state[i] % 100;
    const p1mode = Math.floor((state[i] / 100) % 10);
    const p2mode = Math.floor((state[i] / 1000) % 10);
    switch (op) {
      case 1: {
        // add
        const p1 = p1mode === 1 ? state[i + 1] : state[state[i + 1]];
        const p2 = p2mode === 1 ? state[i + 2] : state[state[i + 2]];
        state[state[i + 3]] = p1 + p2;
        i += 4;
        break;
      }
      case 2: {
        // multiply
        const p1 = p1mode === 1 ? state[i + 1] : state[state[i + 1]];
        const p2 = p2mode === 1 ? state[i + 2] : state[state[i + 2]];
        state[state[i + 3]] = p1 * p2;
        i += 4;
        break;
      }
      case 3: {
        // input
        state[state[i + 1]] = input;
        i += 2;
        break;
      }
      case 4: {
        // output
        output = state[state[i + 1]]
        i += 2;
        break;
      }
      case 99:
        return output;
      default:
        throw new TypeError(`Invalid opcode: ${i}`);
    }
  }

  throw new TypeError('Invalid program, non-terminating');
}

const part2 = (program: number[], input: number): number => {
  const state = [...program];
  let i = 0;
  let output = 0;
  while (i < state.length) {
    // read through next instruction
    // parse opcode
    // parse modes
    // move on appropriately
    const op = state[i] % 100;
    const p1mode = Math.floor((state[i] / 100) % 10);
    const p2mode = Math.floor((state[i] / 1000) % 10);
    const p1 = p1mode === 1 ? state[i + 1] : state[state[i + 1]];
    const p2 = p2mode === 1 ? state[i + 2] : state[state[i + 2]];
    switch (op) {
      case 1: {
        // add
        state[state[i + 3]] = p1 + p2;
        i += 4;
        break;
      }
      case 2: {
        // multiply
        state[state[i + 3]] = p1 * p2;
        i += 4;
        break;
      }
      case 3: {
        // input
        state[state[i + 1]] = input;
        i += 2;
        break;
      }
      case 4: {
        // output
        output = state[state[i + 1]]
        i += 2;
        break;
      }
      case 5: {
        // move pointer if p1 non-zero
        if (p1 !== 0) {
          i = p2;
        } else {
          i += 3;
        }
        break;
      }
      case 6: {
        // move pointer if p1 = zero
        if (p1 === 0) {
          i = p2;
        } else {
          i += 3;
        }
        break;
      }
      case 7: {
        state[state[i + 3]] = p1 < p2 ? 1 : 0;
        i += 4;
        break;
      }
      case 8: {
        state[state[i + 3]] = p1 === p2 ? 1 : 0;
        i += 4;
        break;
      }
      case 99:
        return output;
      default:
        throw new TypeError(`Invalid opcode: ${i}`);
    }
  }

  throw new TypeError('Invalid program, non-terminating');
}

const data = fs.readFileSync(__dirname + '/day5.txt').toString().split(',').map((s) => Number(s));
console.log('Day 5, part 1:', part1(data, 1));
console.log('Day 5, part 2:', part2(data, 5));
