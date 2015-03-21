#!/usr/bin/env node

require('babel/polyfill');

import assert from 'assert';
import path from 'path';
import Converter from './Converter.js';

let argv = require('minimist')(process.argv.slice(2));
if (argv.h || argv.help) {
  console.log('usage: jsdoc-knight indir outdir');
  return;
}

assert.equal(argv._.length, 2, 'specify input dir and output dir.');

let inDirPath = path.resolve(argv._[0]);
let outDirPath = path.resolve(argv._[1]);

Converter.convert(inDirPath, outDirPath);

