import assert from 'power-assert';
import path from 'path';
import fs from 'fs-extra';

describe('file check before and after', ()=>{
  function simulateCommandLine(inDirPath, outDirPath){
    let orig = process.argv;
    process.argv = ['node', 'mocha', inDirPath, outDirPath];
    require('../../src/cli.js');
    process.argv = orig;
  }

  let inDirPath = path.resolve('./test/fixture');
  let outDirPath = path.resolve('./out/test/fixture');
  fs.removeSync(outDirPath);
  simulateCommandLine(inDirPath, outDirPath);

  it('sample.js', ()=>{
    let actualPath = path.resolve(outDirPath, 'sample.js');
    let actualCode = fs.readFileSync(actualPath, {encode: 'utf8'}).toString();

    let expectPath = path.resolve('./test/expect', 'sample.js');
    let expectCode = fs.readFileSync(expectPath, {encode: 'utf-8'}).toString();

    assert.equal(actualCode, expectCode);
  });

  it('dir1/sample.js', ()=>{
    let actualPath = path.resolve(outDirPath, 'dir1/sample.js');
    let actualCode = fs.readFileSync(actualPath, {encode: 'utf8'}).toString();

    let expectPath = path.resolve('./test/expect', 'dir1/sample.js');
    let expectCode = fs.readFileSync(expectPath, {encode: 'utf-8'}).toString();

    assert.equal(actualCode, expectCode);
  })
});
