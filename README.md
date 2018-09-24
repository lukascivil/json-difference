# jsondiffer

[![npm version](http://img.shields.io/npm/v/json-difference.svg?style=flat)](https://www.npmjs.com/package/json-difference "View this project on npm")

## Installation

`$ npm install json-difference`

## Usage

`getDiff(oldStruct, newStruct)`

Returns the structural diff between `oldStruct` and `newStruct`.

## Example

Simple usage:

```ts
const coffee = { color: { color1: 'black', color2: 'brown' }, special: true };
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false };

const jsondifference = new JsonDiffer();
let diff = jsondifference.getDiff(coffee, oil);

console.log(diff)
```

Output:
```json
{
    "new": {
        "special2": false
    },
    "removed": {
        "special": true
    },
    "edited": [{
        "color/color1": {
            "newvalue": "black",
            "oldvalue": "red"
        }
    }, {
        "color/color2": {
            "newvalue": "brown",
            "oldvalue": "blue"
        }
    }]
}
```
