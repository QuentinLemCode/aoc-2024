import { getInput } from './lib';

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const input = await getInput(2);

const lines = input.trim().split('\n').map(line => line.split(' ').map(Number));

const distancesOf = (line: number[]) => {
    const distances: number[] = [];
    for (let i = 0; i < line.length - 1; i++) {
        distances.push(line[i] - line[i + 1]);
    }
    return distances;
};

const distances = lines.map(distancesOf);

const checkSafe = (distances: number[]) => {
    if (distances.every(distance => distance > 0) || distances.every(distance => distance < 0)) {
        if (distances.map(a => Math.abs(a)).some(distance => distance > 3 || distance < 1)) {
            return false;
        }
        return true;
    }
    return false;
};

// part 1
console.log(distances.map(checkSafe).filter(Boolean).length);

// part 2
let result = 0;
lines.forEach((line, index) => {
    if (checkSafe(distancesOf(line))) {
        result++;
    } else {
        for (let i = 0; i < line.length; i++) {
            const newLine = [...line];
            newLine.splice(i, 1);
            if (checkSafe(distancesOf(newLine))) {
                result++;
                break;
            }
        }
    }
});

console.log(result);