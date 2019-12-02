import fs from 'fs';

const part1 = (moduleMass: number[]): number => {
  return moduleMass.reduce((acc, next) => Math.max(Math.floor(next / 3) - 2, 0) + acc, 0)
};

const part2 = (moduleMass: number[]): number => {
  const fuelCost = (mass: number) => Math.max(Math.floor(mass / 3) - 2, 0);

  return moduleMass.reduce((acc, next) => {
    let fuel = fuelCost(next);
    let total = fuel;

    while (fuel !== 0) {
      fuel = fuelCost(fuel);
      total += fuel;
    }

    return total + acc;
  }, 0);
};

const data = fs.readFileSync(__dirname + '/day1.txt').toString().split('\n').map((s) => Number(s));
data.pop();
console.log('Day 1, part 1:', part1(data));
console.log('Day 1, part 2:', part2(data));
