# JsonDifference

[![Total Downloads](https://img.shields.io/npm/dt/json-difference.svg)](https://img.shields.io/npm/dt/json-difference.svg)
[![npm version](http://img.shields.io/npm/v/json-difference.svg?style=flat)](https://www.npmjs.com/package/json-difference 'View this project on npm')
[![CI](https://github.com/lukascivil/jsondiffer/actions/workflows/main.yml/badge.svg)](https://github.com/lukascivil/jsondiffer/actions/workflows/main.yml)
[![Node.js Package](https://github.com/lukascivil/jsondiffer/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/lukascivil/jsondiffer/actions/workflows/npm-publish-github-packages.yml)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![codecov](https://codecov.io/gh/lukascivil/jsondiffer/branch/master/graph/badge.svg)](https://codecov.io/gh/lukascivil/jsondiffer)
[![MIT License](https://img.shields.io/npm/l/deep-object-diff.svg?style=flat)](https://github.com/lukascivil/jsondiffer/blob/master/LICENSE)

Computes the difference between two objects and returns an intuitive result. No matter how big your JSON is, the diff will be returned pretty fast.

The question you should ask is: Given my old structure what was changed, removed or added to the new structure?

## Example

[Last release](http://jsondifference.lukascivil.com.br)

## Installation

```sh
yarn add json-difference
```

Or

```html
<script type="module">
  import { getDiff } from 'https://rawgit.com/lukascivil/jsondiffer/master/dist.browser/json-difference.mjs'
</script>
```

## Example

Running example:

`yarn example {simple, stress}`

## Usage

Method:

`getDiff(oldStruct, newStruct)`

Returns the structural difference between `oldStruct` and `newStruct`.

Simple usage:

```ts
import { getDiff } from 'json-difference'

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true }
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false, especial3: [{}] }

// Get JsonDiff delta
let diff = getDiff(coffee, oil)
let diff2 = getDiff(coffee, oil, true)

console.log(diff)
console.log(diff2)
```

Output:

```json
{
  "added": [
    ["special2", false],
    ["especial3/0[]", {}]
  ],
  "removed": [["special", true]],
  "edited": [
    ["color/color1", "black", "red"],
    ["color/color2", "brown", "blue"]
  ]
}
```

```json
{
  "added": [
    ["special2", false],
    ["especial3[0]", {}]
  ],
  "removed": [["special", true]],
  "edited": [
    ["color.color1", "black", "red"],
    ["color.color2", "brown", "blue"]
  ]
}
```
