const part1 = (min: number, max: number) => {
  const passwords: number[] = [];
  for (let i = min; i <= max; i += 1) {
    passwords.push(i);
  }

  const valid = passwords.filter((p) => {
    // ensure each char is the same or higher than the previous
    const incrementing = String(p).split('').every((val, i, arr) => {
      if (!arr[i - 1]) {
        return true;
      }

      if (Number(val) < Number(arr[i - 1])) {
        return false;
      }

      return true;
    });

    if (!incrementing) {
      return false;
    }

    // if 2 numbers are adjacent
    const adjacentNums = ['11', '22', '33', '44', '55', '66', '77', '88', '99'].some((val) => String(p).includes(val));

    if (adjacentNums) {
      return true;
    }

    return false;
  });

  return valid.length;
};

const part2 = (min: number, max: number) => {
  const passwords: string[] = [];
  for (let i = min; i <= max; i += 1) {
    passwords.push(String(i));
  }

  const valid = passwords.filter((p) => {
    // ensure each char is the same or higher than the previous
    const incrementing = p.split('').every((val, i, arr) => {
      if (!arr[i - 1]) {
        return true;
      }

      if (Number(val) < Number(arr[i - 1])) {
        return false;
      }

      return true;
    });

    if (!incrementing) {
      return false;
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9].some((val) => {
      // use coercion to make string of above numbers
      const doubleIndex = p.search("" + val + val);

      // no pair of adjacent nums, not valid password
      if (doubleIndex === -1) {
        return false;
      }

      // if char either side of pair is the same, not valid password
      if (p.charAt(doubleIndex - 1) === String(val) || p.charAt(doubleIndex + 2) === String(val)) {
        return false;
      }

      return true;
    });
  });

  return valid.length;
}

console.log('Day 4, part 1:', part1(137683, 596253));
console.log('Day 4, part 2:', part2(137683, 596253));
