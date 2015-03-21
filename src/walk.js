import fs from 'fs-extra';
import path from 'path';

export default function walk(dirPath, callback) {
  let entries = fs.readdirSync(dirPath);

  for (let entry of entries) {
    let entryPath = path.resolve(dirPath, entry);
    let stat = fs.statSync(entryPath);

    if (stat.isFile()) {
      let content = fs.readFileSync(entryPath, {encode: 'utf-8'});
      callback(entryPath, content);
    } else if (stat.isDirectory()) {
      walk(entryPath, callback);
    }
  }
}
