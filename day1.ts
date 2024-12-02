import { getInput } from './lib';

const example = `3   4
4   3
2   5
1   3
3   9
3   3`

const input = await getInput(1);

const lines = input.trim().split('\n').map(line => line.split('   '));
const arrayOfFirstColumn = lines.map(line => line[0]).map(Number).sort();
const arrayOfSecondColumn = lines.map(line => line[1]).map(Number).sort();

const result = arrayOfFirstColumn.map((value, index) => Math.abs(value - arrayOfSecondColumn[index])).reduce((acc, value) => acc + value, 0);
console.log(result);

const resultPart2 = arrayOfFirstColumn.map(value => value * arrayOfSecondColumn.filter(secondValue => secondValue === value).length).reduce((acc, value) => acc + value, 0);
console.log(resultPart2);