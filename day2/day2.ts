import fs from 'fs';

const part1 = (input: number[], noun: number, verb: number): number => {
  input[1] = noun;
  input[2] = verb;
  for (let i = 0; input[i] !== 99; i += 4) {
    switch (input[i]) {
      case 1:
        input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
        break;
      case 2:
        input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
        break;
      default:
        throw new TypeError(`Invalid opcode: ${i}`);
    }
  }

  return input[0];
};

const part2 = (input: number[]): number => {
  for (let noun = 0; noun <= 99; noun += 1) {
    for (let verb = 0; verb <= 99; verb += 1) {
      try {
        if (part1([...input], noun, verb) === 19690720) {
          return (100 * noun) + verb;
        }
      } catch {
        // swallow invalid inputs
      }
    }
  }

  throw new TypeError('Invalid program');
};

const data = fs.readFileSync(__dirname + '/day2.txt').toString().split(',').map((s) => Number(s));
console.log('Day 2, part 1:', part1([...data], 12, 2));
console.log('Day 2, part 2:', part2(data));
