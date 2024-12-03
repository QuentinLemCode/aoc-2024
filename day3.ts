import { getInput } from './lib';

const example = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const input = await getInput(3);

const regex = /mul\(\d{1,3},\d{1,3}\)/g;

// part 1

const calculate = (str: string) => {
    const matches = str.match(regex);
    const numbers = matches!.map(match => match.match(/\d{1,3}/g)!.map(Number))
    return numbers.reduce((acc, [a, b]) => acc + (a * b), 0);
}
console.log(calculate(input));

// part 2

function removeDontDo(input: string): string {
    let result: string = '';
    let skip = false;
    let i = 0;

    while (i < input.length) {
        if (input.substring(i, i + 6) === "don't(") {
            skip = true;
            i += 6;
        }
        else if (input.substring(i, i + 4) === "do()") {
            skip = false;
            i += 4;
        }
        else if (!skip) {
            result += input[i];
            i++;
        } else {
            i++;
        }
    }

    return result;
}

const removed = removeDontDo(input);
console.log(calculate(removed));


