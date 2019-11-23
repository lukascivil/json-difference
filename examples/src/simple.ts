import { JsonDiffer } from 'json-difference';

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true };
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false };

const jsondifference = new JsonDiffer();
const diff = jsondifference.getDiff(coffee, oil);

console.log('diff', JSON.stringify(diff));
