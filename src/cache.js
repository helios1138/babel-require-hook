import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import {flags} from './flags';

let cacheDir = path.resolve(__dirname, '../cache');
mkdirp.sync(cacheDir);

function encode(string) {
  return new Buffer(string).toString('base64');
}

function getCacheFilename(filename) {
  let cacheKey = encode(`${filename}[${flags.generatorSupport}]`);
  return `${cacheDir}/${cacheKey}.cache`;
}

export var cache = {
  get(filename){
    let cacheFilename = getCacheFilename(filename);

    if (!fs.existsSync(cacheFilename) || +fs.statSync(filename).mtime > +fs.statSync(cacheFilename).mtime) {
      return;
    }

    return fs.readFileSync(cacheFilename).toString();
  },

  put(filename, value){
    fs.writeFileSync(getCacheFilename(filename), value);
  }
};
