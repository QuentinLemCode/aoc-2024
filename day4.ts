import { getInput } from './lib';

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const input = await getInput(4);

// part 1

const grid = input.split('\n').map((row) => row.split(''));
const gridCopy = input.split('\n').map((row) => row.split('').map(() => ''));
const word = 'XMAS';
const wordLength = word.length;

let found = 0;

const check = (i: number, j: number) => {
  // right
  if (j <= grid[0].length - wordLength) {
    if (grid[i].slice(j, j + wordLength).join('') === word) {
      gridCopy[i][j] = 'X';
      gridCopy[i][j + 1] = 'M';
      gridCopy[i][j + 2] = 'A';
      gridCopy[i][j + 3] = 'S';
      found++;
    }
  }

  // right down
  if (i <= grid.length - wordLength && j <= grid[0].length - wordLength) {
    if (
      [
        grid[i][j],
        grid[i + 1][j + 1],
        grid[i + 2][j + 2],
        grid[i + 3][j + 3],
      ].join('') === word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i + 1][j + 1] = 'M';
      gridCopy[i + 2][j + 2] = 'A';
      gridCopy[i + 3][j + 3] = 'S';
      found++;
    }
  }

  // down
  if (i <= grid.length - wordLength) {
    if (
      [grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j]].join('') ===
      word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i + 1][j] = 'M';
      gridCopy[i + 2][j] = 'A';
      gridCopy[i + 3][j] = 'S';
      found++;
    }
  }

  // left down
  if (i <= grid.length - wordLength && j >= wordLength - 1) {
    if (
      [
        grid[i][j],
        grid[i + 1][j - 1],
        grid[i + 2][j - 2],
        grid[i + 3][j - 3],
      ].join('') === word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i + 1][j - 1] = 'M';
      gridCopy[i + 2][j - 2] = 'A';
      gridCopy[i + 3][j - 3] = 'S';
      found++;
    }
  }

  // left
  if (j >= wordLength - 1) {
    if (
      [grid[i][j], grid[i][j - 1], grid[i][j - 2], grid[i][j - 3]].join('') ===
      word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i][j - 1] = 'M';
      gridCopy[i][j - 2] = 'A';
      gridCopy[i][j - 3] = 'S';
      found++;
    }
  }

  // left up
  if (i >= wordLength - 1 && j >= wordLength - 1) {
    if (
      [
        grid[i][j],
        grid[i - 1][j - 1],
        grid[i - 2][j - 2],
        grid[i - 3][j - 3],
      ].join('') === word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i - 1][j - 1] = 'M';
      gridCopy[i - 2][j - 2] = 'A';
      gridCopy[i - 3][j - 3] = 'S';
      found++;
    }
  }

  // up
  if (i >= wordLength - 1) {
    if (
      [grid[i][j], grid[i - 1][j], grid[i - 2][j], grid[i - 3][j]].join('') ===
      word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i - 1][j] = 'M';
      gridCopy[i - 2][j] = 'A';
      gridCopy[i - 3][j] = 'S';
      found++;
    }
  }

  // right up
  if (i >= wordLength - 1 && j <= grid[0].length - wordLength) {
    if (
      [
        grid[i][j],
        grid[i - 1][j + 1],
        grid[i - 2][j + 2],
        grid[i - 3][j + 3],
      ].join('') === word
    ) {
      gridCopy[i][j] = 'X';
      gridCopy[i - 1][j + 1] = 'M';
      gridCopy[i - 2][j + 2] = 'A';
      gridCopy[i - 3][j + 3] = 'S';
      found++;
    }
  }
};

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === 'X') {
      check(i, j);
    }
  }
}

// console.log(gridCopy.map((row) => row.map(a => a === '' ? '.' : a).join('')).join('\n'));
console.log(found);

// part 2

const schemes = [
  ['M.M', 'M.S', 'S.S', 'S.M'],
  ['.A.', '.A.', '.A.', '.A.'],
  ['S.S', 'M.S', 'M.M', 'S.M'],
];

const checkScheme = (i: number, j: number) => {
  next: for (let s = 0; s <= schemes.length; s++) {
    const scheme = schemes.flatMap((row) => row[s]);
    let valid = true;
    for (let k = 0; k < scheme.length; k++) {
      for (let l = 0; l < scheme[k].length; l++) {
        if (scheme[k][l] !== '.') {
          if (grid[i + k][j + l] !== scheme[k][l]) {
            valid = false;
            continue next;
          }
        }
      }
    }
    if (valid) {
      return true;
    }
  }
  return false;
};
let found2 = 0;

for (let i = 0; i <= grid.length - 3; i++) {
  for (let j = 0; j <= grid[i].length - 3; j++) {
    if (checkScheme(i, j)) {
      found2++;
    }
  }
}

console.log(found2);
