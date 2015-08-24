let babel = require('babel-core');

import {cache} from './cache';

export function compile(filename) {
  let result = cache.get(filename);

  if (!result) {
    let {code} = babel.transformFileSync(filename, { optional: ['bluebirdCoroutines'] });
    result = babel.transform(code).code;

    cache.put(filename, result);
  }

  return result;
}
