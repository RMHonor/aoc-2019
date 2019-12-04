import fs from 'fs';

interface WireIntersection {
  x: number;
  y: number;
  wire1Len: number;
  wire2Len: number;
}

const getIntersections = (wires: [string[], string[]]): WireIntersection[] => {
  const routes = wires.map((w) => {
    const pos = [0, 0];
    const route: [number, number][] = [];
    // draw routes for each wire
    w.forEach((instruction) => {
      const dir = instruction[0];
      const distance = instruction.substr(1);
      for (let i = Number(distance); i > 0; i -= 1) {
        switch (dir) {
          case 'R': {
            pos[0] = pos[0] + 1;
            route.push([pos[0], pos[1]]);
            break;
          }
          case 'L': {
            pos[0] = pos[0] - 1;
            route.push([pos[0], pos[1]]);
            break;
          }
          case 'U': {
            pos[1] = pos[1] + 1;
            route.push([pos[0], pos[1]]);
            break;
          }
          case 'D': {
            pos[1] = pos[1] - 1;
            route.push([pos[0], pos[1]]);
            break;
          }
          default:
            throw new TypeError(`Invalid direction: ${dir}.`);
        }
      }
    });
    return route;
  });

  // find interesections
  const intersections: WireIntersection[] = [];
  routes[0].forEach((pos1, i) => {
    return routes[1].forEach((pos2, j) => {
      if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
        intersections.push({
          x: pos1[0],
          y: pos1[1],
          wire1Len: i,
          wire2Len: j,
        });
      }
    });
  });

  return intersections;
}
const part1 = (wires: [string[], string[]]) => {
  return Math.min(...getIntersections(wires).map((i) => Math.abs(i.x + i.y)));
};

const part2 = (wires: [string[], string[]]) => {
  return Math.min(...getIntersections(wires).map((i) => i.wire1Len + i.wire2Len));
};

const [wire1, wire2] = fs
  .readFileSync(__dirname + '/day3.txt')
  .toString()
  .split('\n')
  .map((s) => s.split(','));

console.log('Day 3, part 1:', part1([wire1, wire2]));
console.log('Day 3, part 2:', part2([wire1, wire2]));
