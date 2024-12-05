import { getInput } from './lib';

const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

const input = await getInput(5);

const parse = (str: string) => {
    const [orders, updates] = str.split('\n\n');
    return { orders: orders.split('\n').map(a => a.split('|').map(Number)), updates: updates.split('\n').map(a => a.split(',').map(Number)) };
}

const {orders, updates} = parse(input);

const validUpdates = updates.filter((update => {
    for (let i = 1; i < update.length; i++) {
        const numToCheck = update[i];
        for (const [first, second] of orders) {
            if (numToCheck !== first) continue;
            if (update.slice(0,i).includes(second)) return false;
        }
    }
    return true;
}))

const result = validUpdates.map(v => v[Math.floor(v.length / 2)]);

console.log(result.reduce((a,b) => a + b, 0));