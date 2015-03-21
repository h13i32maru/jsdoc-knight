import path from 'path';
import fs from 'fs-extra';
import walk from './util/walk.js';
import generate from './util/generate.js';

export default function convert(inDirPath, outDirPath) {
  walk(inDirPath, (filePath, content)=>{
    let code;
    try {
      code = generate(content);
    } catch(e) {
      console.log(e);
      return;
    }

    let outFileName = filePath.replace(inDirPath, './');
    let outFilePath = path.resolve(outDirPath, outFileName);
    fs.outputFileSync(outFilePath, code + '\n');
  });
}
