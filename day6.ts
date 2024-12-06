import { getInput } from './lib';

const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const input = await getInput(6);

// X,Y
const vecs = [[-1,0],[0,1],[1,0],[0,-1]];
const grid =  input.split('\n').map(x => x.split(''));

const startX = grid.findIndex(x => x.includes('^'));
const startY = grid[startX].findIndex(y => y === '^')

let pos = [startX, startY];
let vecIdx = 0;
let vec = vecs[vecIdx];
let done = false;

const posSet = new Set<string>();

while(!done) {
    posSet.add(`${pos[0]}-${pos[1]}`);
    console.log(pos);
    pos[0] += vec[0];
    pos[1] += vec[1];
    if(pos[0] < 0 || pos[0] >= grid.length - 1 || pos[1] < 0 || pos[1] >= grid[0].length - 1) {
        done = true;
        break;
    }
    if(grid[pos[0] + vec[0]][pos[1] + vec[1]] === '#') {
        vecIdx = (vecIdx + 1) % 4;
        vec = vecs[vecIdx];
    }
}
console.log(posSet.size);

