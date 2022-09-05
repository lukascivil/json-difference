import { getDiff } from 'json-difference'

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true }
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false }

const diff = getDiff(coffee, oil)

console.log('diff', JSON.stringify(diff))
