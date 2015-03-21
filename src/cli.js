#!/usr/bin/env node

import assert from 'assert';
import path from 'path';
import convert from './index.js';

let argv = require('minimist')(process.argv.slice(2));
if (argv.h || argv.help) {
  console.log('usage: jsdoc-knight -o outdir indir');
  return;
}

assert(argv.o || argv.out, 'specify out put dir.');

let outDirPath = path.resolve(argv.o || argv.out);
let inDirPath = path.resolve(argv._[0]);

convert(inDirPath, outDirPath);

