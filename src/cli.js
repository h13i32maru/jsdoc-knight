#!/usr/bin/env node

import assert from 'assert';
import path from 'path';
import fs from 'fs-extra';
import walk from './walk.js';
import convert from './convert.js';

var argv = require('minimist')(process.argv.slice(2));
if (argv.h || argv.help) {
  console.log('usage: jsdoc-knight -o outdir indir');
  return;
}

assert(argv.o, `specify out put dir.`);

let outDirPath = path.resolve(argv.o);
let inDirPath = path.resolve(argv._[0]);

walk(inDirPath, (filePath, content)=>{
  let code;
  try {
    code = convert(content);
  } catch(e) {
    console.log(e);
    return;
  }

  let outFileName = filePath.replace(inDirPath, './');
  let outFilePath = path.resolve(outDirPath, outFileName);
  fs.outputFileSync(outFilePath, code);
});

