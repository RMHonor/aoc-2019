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

const data = fs.readFileSync(__dirname + '/day2.txt').toString().split(',').map((s) => Number(s));
console.log('Day 2, part 1:', part1(data, 12, 2));
// console.log('Day 2, part 2:', part2(data));
