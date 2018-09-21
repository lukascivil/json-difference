import { JsonDiffer } from '../src/jsondiffer';

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true };
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false };

const treewalkerjs = new JsonDiffer();
let diff = treewalkerjs.getDiff(coffee, oil);

console.log('coffee', coffee)
console.log('oil', oil)
console.log('diff', JSON.stringify(diff))