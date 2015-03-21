import assert from 'power-assert';
import path from 'path';
import fs from 'fs';
import convert from '../../src/index.js';

describe('file check before and after', ()=>{
  let inDirPath = path.resolve('./test/fixture');
  let outDirPath = path.resolve('./out/test/fixture');
  convert(inDirPath, outDirPath);

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
