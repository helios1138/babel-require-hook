import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

let cacheDir = path.resolve(__dirname, './cache');
mkdirp.sync(cacheDir);

function encode(string) {
  return new Buffer(string).toString('base64');
}

function getKey(filename) {
  let stat = fs.statSync(filename);
  let key = `${filename}.${+stat.mtime}`;

  return `${cacheDir}/${encode(key)}.cache`;
}

export var cache = {
  get(filename){
    let key = getKey(filename);

    if (fs.existsSync(key)) {
      return fs.readFileSync(key).toString();
    }
  },

  put(filename, value){
    fs.writeFileSync(getKey(filename), value);
  }
};
