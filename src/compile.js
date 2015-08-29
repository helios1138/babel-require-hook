let babel = require('babel-core');

import {cache} from './cache';
import {flags} from './flags';

export function compile(filename) {
  let result = cache.get(filename);

  if (!result) {
    let {code} = babel.transformFileSync(filename, { optional: ['bluebirdCoroutines'] });
    result = flags.generatorSupport ?
      code :
      babel.transform(code).code;

    cache.put(filename, result);
  }

  return result;
}
