# jsondiffer

[![Total Downloads](https://img.shields.io/npm/dt/json-difference.svg)](https://img.shields.io/npm/dt/json-difference.svg)
[![npm version](http://img.shields.io/npm/v/json-difference.svg?style=flat)](https://www.npmjs.com/package/json-difference 'View this project on npm')
[![CI](https://github.com/lukascivil/jsondiffer/actions/workflows/main.yml/badge.svg)](https://github.com/lukascivil/jsondiffer/actions/workflows/main.yml)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![codecov](https://codecov.io/gh/lukascivil/jsondiffer/branch/master/graph/badge.svg)](https://codecov.io/gh/lukascivil/jsondiffer)
[![MIT License](https://img.shields.io/npm/l/deep-object-diff.svg?style=flat)](https://github.com/lukascivil/jsondiffer/blob/master/LICENSE)

## Example

[master](http://jsondifference.lukascivil.com.br)

## Installation

`npm install json-difference --save`

```html
<script type="module">
  import { getDiff } from 'https://rawgit.com/lukascivil/jsondiffer/master/dist.browser/json-difference.mjs';
</script>
```

## Example

Running example:

`npm run example {simple, stress}`

## Usage

Method:

`getDiff(oldStruct, newStruct)`

Returns the structural diff between `oldStruct` and `newStruct`.

Simple usage:

```ts
import { JsonDiffer } from 'json-difference';

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true };
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false };

const jsondifference = new JsonDiffer();
let diff = jsondifference.getDiff(coffee, oil);

console.log(diff);
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
  "edited": [
    {
      "color/color1": {
        "oldvalue": "black",
        "newvalue": "red"
      }
    },
    {
      "color/color2": {
        "oldvalue": "brown",
        "newvalue": "blue"
      }
    }
  ]
}
```
