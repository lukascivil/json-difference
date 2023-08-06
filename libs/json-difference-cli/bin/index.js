#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const json_difference_1 = require("json-difference");
const options = yargs_1.default
    .usage('Usage: -o <original> -m <modified>')
    .option('o', { alias: 'original', describe: 'Json 1', type: 'string', demandOption: true })
    .option('m', { alias: 'modified', describe: 'Json 2', type: 'string', demandOption: true }).argv;
const delta = (0, json_difference_1.getDiff)(options === null || options === void 0 ? void 0 : options.original, options.modified);
console.log('delta ->', delta);
